import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const user = await getCurrentUser();
    const userId = user?.id;

    const body = await req.json();

    const {
      username,
      name,
      lastName,
      email,
      image,
      proNouns,
      title,
      bio,
      phone,
      address,
      link1,
      linkText1,
      linkText2,
      link2,
      fb,
      tw,
      ig,
      li,
      tt,
      yt,
      twt,
      password,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!email) {
      return new NextResponse("email is required", { status: 400 });
    }

    if (!username) {
      return new NextResponse("username is required", { status: 400 });
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

    const hashedPassword = await bcrypt.hash(password, 12);

    const account = await prismadb.user.create({
      data: {
        username,
        email,
        image,
        proNouns,
        title,
        bio,
        phone,
        address,
        link1,
        linkText1,
        linkText2,
        link2,
        fb,
        tw,
        ig,
        li,
        tt,
        yt,
        twt,
        name,
        lastName,
        hashedPassword,
      },
    });

    return NextResponse.json(account);
  } catch (error) {
    console.log("[PROFILE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const accounts = await prismadb.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(accounts);
  } catch (error) {
    console.log("[PROFILE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
