import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const usersFile = path.join(process.cwd(), "data/temp-users.json")

function readUsers() {
  const data = fs.readFileSync(usersFile, "utf8")
  return JSON.parse(data)
}

function writeUsers(users: any[]) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
}

export async function POST(req: Request) {
  const { email, password, type } = await req.json()

  if (type !== "company") {
    return NextResponse.json({ error: "Only company login is supported." }, { status: 403 })
  }

  const users = readUsers()
  const user = users.find((u: any) => u.email === email && u.password === password)

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 })
  }

  return NextResponse.json({ message: "Login successful", user: { email: user.email } })
}
