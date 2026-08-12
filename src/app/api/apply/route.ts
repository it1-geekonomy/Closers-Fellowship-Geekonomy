import { NextResponse } from "next/server";

type ApplicationPayload = {
  full_name?: string;
  email?: string;
  phone?: string;
  seat?: string;
  linkedin_portfolio?: string;
  answer_q1?: string;
  answer_q2?: string;
  answer_q3?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_source?: string;
  utm_medium?: string;
};

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message:
        "This endpoint only accepts POST from the application form. Open the homepage and submit there.",
    },
    { status: 405 },
  );
}

export async function POST(request: Request) {
  const apiUrl = process.env.HRMS_API_URL?.trim();
  const apiKey = process.env.HRMS_API_KEY?.trim();

  if (!apiUrl || !apiKey || apiKey === "YOUR_API_KEY") {
    return NextResponse.json(
      {
        success: false,
        message:
          "HRMS API is not configured. Set HRMS_API_URL and HRMS_API_KEY in Vercel Environment Variables (or .env.local locally), then redeploy.",
      },
      { status: 500 },
    );
  }

  let body: ApplicationPayload;

  try {
    body = (await request.json()) as ApplicationPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const fullName = asTrimmedString(body.full_name);
  const email = asTrimmedString(body.email);
  const phone = asTrimmedString(body.phone);
  const seat = asTrimmedString(body.seat);
  const q1 = asTrimmedString(body.answer_q1);
  const q2 = asTrimmedString(body.answer_q2);
  const q3 = asTrimmedString(body.answer_q3);

  if (!fullName || !email || !phone || !seat) {
    return NextResponse.json(
      { success: false, message: "Name, email, phone, and seat are required." },
      { status: 400 },
    );
  }

  const answeredCount = [q1, q2, q3].filter(Boolean).length;
  if (answeredCount < 2) {
    return NextResponse.json(
      { success: false, message: "Answer any 2 of the 3 questions to submit." },
      { status: 400 },
    );
  }

  const payload = {
    full_name: fullName,
    email,
    phone,
    seat,
    linkedin_portfolio: asTrimmedString(body.linkedin_portfolio),
    answer_q1: q1,
    answer_q2: q2,
    answer_q3: q3,
    utm_campaign: asTrimmedString(body.utm_campaign),
    utm_content: asTrimmedString(body.utm_content),
    utm_term: asTrimmedString(body.utm_term),
    utm_source: asTrimmedString(body.utm_source),
    utm_medium: asTrimmedString(body.utm_medium),
  };

  try {
    // Django APPEND_SLASH can 301 POST→GET if trailing slash is missing.
    const endpoint = new URL(apiUrl);
    if (!endpoint.pathname.endsWith("/")) {
      endpoint.pathname = `${endpoint.pathname}/`;
    }

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    };
    const bodyJson = JSON.stringify(payload);

    // Do not auto-follow redirects (301/302 turn POST into GET).
    let response = await fetch(endpoint.toString(), {
      method: "POST",
      headers,
      body: bodyJson,
      cache: "no-store",
      redirect: "manual",
    });

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location) {
        return NextResponse.json(
          {
            success: false,
            message: "HRMS redirected the request without a Location header.",
          },
          { status: 502 },
        );
      }
      const redirectedUrl = new URL(location, endpoint).toString();
      response = await fetch(redirectedUrl, {
        method: "POST",
        headers,
        body: bodyJson,
        cache: "no-store",
        redirect: "manual",
      });
    }

    const data = (await response.json().catch(() => null)) as
      | { success?: boolean; id?: number; message?: string; detail?: string }
      | null;

    if (!response.ok) {
      console.error("[closers-fellowship] HRMS rejected request", {
        status: response.status,
        message: data?.message || data?.detail || null,
        apiUrl: endpoint.toString(),
        keyLoaded: Boolean(apiKey),
        keyLength: apiKey.length,
      });

      return NextResponse.json(
        {
          success: false,
          message:
            data?.message ||
            data?.detail ||
            "Could not submit application. Please try again.",
        },
        { status: response.status },
      );
    }

    return NextResponse.json(
      {
        success: true,
        id: data?.id,
        message: data?.message || "Application submitted successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[closers-fellowship] Failed to reach HRMS", {
      apiUrl,
      error: error instanceof Error ? error.message : "unknown",
    });

    return NextResponse.json(
      {
        success: false,
        message:
          "Could not reach HRMS. Check that the API server is running and reachable.",
      },
      { status: 502 },
    );
  }
}
