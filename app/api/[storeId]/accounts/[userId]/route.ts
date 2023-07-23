import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    if (!params.userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const account = await prismadb.user.findUnique({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json(account);
  } catch (error) {
    console.log("[ACCOUNT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string; storeId: string } }
) {
  try {
    const user = await getCurrentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const account = await prismadb.user.delete({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json(account);
  } catch (error) {
    console.log("[ACCOUNT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string; storeId: string } }
) {
  try {
    const user = await getCurrentUser();
    const userId = user?.id;

    const body = await req.json();

    const { name, email, role } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!role) {
      return new NextResponse("Role is required", { status: 400 });
    }

    if (!params.userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const account = await prismadb.user.update({
      where: {
        id: params.userId,
      },
      data: {
        name,
        email,
        role,
      },
    });

    return NextResponse.json(account);
  } catch (error) {
    console.log("[ACCOUNT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
