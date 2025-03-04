/*port CreateNoteDialog from "@/components/CreateNoteDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const DashboardPage = async (props: Props) => {
  const { userId } = auth();
  const notes = await db
    .select()
    .from($notes)
    .where(eq($notes.userId, userId!));

  return (
    <>
     <div className="min-h-screen bg-[#f8f5e6] bg-[url('/paper-texture.svg')]">
      
      <div className="fixed left-0 top-0 bottom-0 w-6 md:w-12 bg-[#e2d9bc] shadow-inner">
        <div className="h-full flex flex-col justify-between py-8">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-full h-2 bg-[#d1c7a3] rounded-full shadow-sm" />
          ))}
        </div>
      </div>
      <div className="grainy min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
          <div className="h-14"></div>
          <div className="flex justify-between items-center md:flex-row flex-col">
            <div className="flex items-center">
              <Link href="/">
                <Button className="bg-orange-600" size="sm">
                  <ArrowLeft className="mr-1 w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div className="w-4"></div>
              <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
              <div className="w-4"></div>
              <UserButton />
            </div>
          </div>

          <div className="h-8"></div>
          <Separator />
          <div className="h-8"></div>
          /* list all the notes */
          /* if no notes, display this *//*
          {notes.length === 0 && (
            <div className="text-center">
              <h2 className="text-xl text-gray-500">You have no notes yet.</h2>
            </div>
          )}

          /* display all the notes */
          /*
          <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3">
            <CreateNoteDialog />
            {notes.map((note) => {
              return (
                <a href={`/notebook/${note.id}`} key={note.id}>
                  <div className="border border-stone-300 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                    <Image
                      width={400}
                      height={200}
                      alt={note.name}
                      src={note.imageUrl || ""}
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {note.name}
                      </h3>
                      <div className="h-1"></div>
                      <p className="text-sm text-gray-500">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default DashboardPage;
*/
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, Coffee, Grid3X3, List } from "lucide-react"
import { UserButton, auth } from "@clerk/nextjs"
import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateNoteDialog from "@/components/CreateNoteDialog"
//import { headers } from "next/headers"

type Props = {}

const DashboardPage = async ( props: Props ) => {
  const { userId } = await auth()
  //const headersData = await headers()
  const notes = await db.select().from($notes).where(eq($notes.userId, userId!))

  return (
    <>
    <div className="min-h-screen bg-[#f8f5e6] bg-[url('/paper-texture.svg')]">
      {/* Left binding effect */}
      <div className="fixed left-0 top-0 bottom-0 w-6 md:w-12 bg-[#e2d9bc] shadow-inner">
        <div className="h-full flex flex-col justify-between py-8">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-full h-2 bg-[#d1c7a3] rounded-full shadow-sm" />
          ))}
        </div>
      </div>

      <div className="pl-8 md:pl-16 pr-4 py-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-[#d1c7a3] pb-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-[#5c4f3a] hover:text-[#8a7456] hover:bg-[#e9e2cc] rounded-xl flex gap-2 items-center"
              >
                <ArrowLeft size={18} />
                <span className="font-serif">Back</span>
              </Button>
            </Link>

            <h1 className="text-2xl md:text-3xl font-serif text-[#5c4f3a] font-bold flex items-center gap-3">
              My Notes
            </h1>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a7456]" />
              <Input
                placeholder="Search notes..."
                className="pl-9 bg-[#e9e2cc] border-[#d1c7a3] text-[#5c4f3a] w-[200px] rounded-xl focus-visible:ring-[#8a7456]"
              />
            </div>

            <div className="flex border border-[#d1c7a3] rounded-lg overflow-hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none bg-[#e9e2cc] text-[#5c4f3a]">
                <Grid3X3 size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none bg-transparent text-[#5c4f3a]">
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-[#e9e2cc] p-1 rounded-xl">
            <TabsTrigger
              value="all"
              className="rounded-lg data-[state=active]:bg-[#f8f5e6] data-[state=active]:text-[#5c4f3a] data-[state=active]:shadow-sm text-[#8a7456] font-serif"
            >
              All Notes
            </TabsTrigger>
            <TabsTrigger
              value="recent"
              className="rounded-lg data-[state=active]:bg-[#f8f5e6] data-[state=active]:text-[#5c4f3a] data-[state=active]:shadow-sm text-[#8a7456] font-serif"
            >
              Recent
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="rounded-lg data-[state=active]:bg-[#f8f5e6] data-[state=active]:text-[#5c4f3a] data-[state=active]:shadow-sm text-[#8a7456] font-serif"
            >
              Favorites
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <CreateNoteDialog />
          {notes.map((note) => (
            <Link href={`/notebook/${note.id}`} key={note.id}>
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-[#d1c7a3] rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex flex-col rounded-xl overflow-hidden bg-[#f8f5e6] border border-[#d1c7a3] shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-40 overflow-hidden bg-[#e9e2cc]">
                    {note.imageUrl && (
                      <Image
                        src={note.imageUrl || "/placeholder.svg"}
                        alt={note.name}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-3 flex flex-col">
                    <h3 className="font-serif text-[#5c4f3a] font-medium line-clamp-1">{note.name}</h3>
                    <time className="text-xs text-[#8a7456] mt-1 font-serif">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="text-center mt-10">
            <h2 className="text-xl text-[#8a7456] font-serif">You have no notes yet.</h2>
            <p className="text-[#5c4f3a] mt-2 font-serif">Create your first note to get started!</p>
          </div>
        )}

        {/* Tip */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[#8a7456] font-serif italic">
          <Coffee size={16} />
          <span>Tip: Press</span>
          <kbd className="px-2 py-1 bg-[#e9e2cc] rounded text-xs font-mono">Ctrl + N</kbd>
          <span>to create a new note</span>
        </div>
      </div>
    </div>
  </>
  )
}

export default DashboardPage

