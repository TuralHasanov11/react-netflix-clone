import dbCLient from "@/lib/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, username, password, password_confirm } =
      await request.json();

    if (password !== password_confirm)
      return NextResponse.json("The passwords do not match", { status: 422 });

    const user = await dbCLient.user.findUnique({
      where: { email },
    });

    if (user)
      return NextResponse.json(
        { message: "The account already exists!" },
        { status: 422 }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await dbCLient.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        image: "",
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
