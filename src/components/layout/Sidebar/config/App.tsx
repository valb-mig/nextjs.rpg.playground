"use client";

import { useState } from "react";
import Link from "next/link";

import { z } from "zod";

import Modal from "@layout/Modal";
import Form from "@ui/Form";

import {
    Users,
    Home,
    Cog,
    MessageSquareText,
    X,
    PanelRightOpen,
    PanelRightClose,
    ScrollText
} from "lucide-react";

const AppSidebar = () => {

    const [ showFeedback, setShowFeedback ] = useState(false);
    const [ showSidebar, setShowSidebar ] = useState(false);

    const FeedbackZodSchema = z.object({
        feedback: z.string().min(1, "Feedback message is required")
    });

    const onFeedbackFormSubmit = async (feedback: string) => {
        console.log(feedback);
    };


    return (
        <>
            {showFeedback && (
                <Modal.Root>

                <Modal.Header>
                  <h1 className="text-foreground-1 text-3xl font-medium">
                    Senda a feedback
                  </h1>
                  <button onClick={() => setShowFeedback(false)} className="text-foreground-1 text-2xl font-medium">
                    <X />
                  </button>
                </Modal.Header>
      
                <Modal.Body>
                  <Form.Body onSubmit={onFeedbackFormSubmit} schema={FeedbackZodSchema}>
                    ...
                  </Form.Body>
                </Modal.Body>
      
              </Modal.Root>
            )}
            <div className="flex flex-col p-2 group">
                <aside className={`relative flex flex-col gap-4 bg-shade-4 justify-between rounded-lg h-full p-2 `+(showSidebar ? "w-52":"w-12")}>
                    {
                        showSidebar ? (
                            <section>
                                <ul className="flex flex-col gap-2">
                                    <li className="flex gap-2 items-center text-foreground-1 w-full rounded-lg hover:bg-shade-3 p-1 px-2">
                                        <Link href="/home" className="flex gap-2 items-center text-foreground-1 text-xl font-medium">
                                            <Home className="text-primary size-6" />
                                            Home
                                        </Link>
                                    </li>
                                    <li className="flex gap-2 items-center text-foreground-1 w-full rounded-lg hover:bg-shade-3 p-1 px-2">
                                        <Link href="/friends" className="flex gap-2 items-center text-foreground-1 text-xl font-medium">
                                            <Users className="text-primary size-6" />
                                            Friends
                                        </Link>
                                    </li>
                                </ul>
                            </section>
                        ) : (
                            <div className="flex flex-col gap-1 justify-center items-center">
                                <span className="flex gap-2 items-center text-foreground-1 p-2 rounded-lg hover:bg-shade-3">
                                    <Link href="/home" className="w-full text-foreground-1 font-medium">
                                        <Home className="text-primary size-6" />
                                    </Link>
                                </span>
                                <span className="flex gap-2 items-center text-foreground-1 p-2 rounded-lg hover:bg-shade-3">
                                    <Link href="/friends" className="w-full text-foreground-1 font-medium">
                                        <Users className="text-primary size-6" />
                                    </Link>
                                </span>
                            </div>
                        )
                    }
                    <button 
                        onClick={() => setShowSidebar(!showSidebar)} 
                        className="absolute top-2/4 -right-5 items-center text-primary bg-shade-3 border border-shade-2 p-1 rounded-lg size-9 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                        {
                            showSidebar ? (
                                <PanelRightOpen/>
                            ):(
                                <PanelRightClose/>
                            )
                        }
                    </button>

                    <div className="flex flex-col gap-2 w-full">
                        {
                            showSidebar ? (
                                <section className="border border-shade-2 rounded-lg p-2">
                                    <div className="flex flex-col gap-2 items-center justify-center text-foreground-1 text-lg font-medium">
                                        <h2 className="flex gap-2 items-center text-2xl">
                                            <ScrollText className="text-primary size-6" />
                                            Logs
                                        </h2>
                                        <div className="bg-shade-3 border border-shade-2 w-full rounded-lg p-2 h-44 max-h-44 overflow-y-scroll">
                                            <p className="text-lg font-medium text-primary">Update v1.0</p>
                                            <hr className="border-shade-2 w-full" />
                                            <p className="text-sm text-foreground-3">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                                eget lacus in libero convallis facilisis. Sed eget lacus in
                                                libero convallis facilisis. Sed eget lacus in libero convallis
                                                facilisis. Sed eget lacus in libero convallis facilisis. Sed
                                                eget lacus in libero convallis facilisis. Sed eget lacus in
                                                libero convallis facilisis. Sed eget lacus in libero convallis
                                                facilisis. Sed eget lacus in libero convallis facilisis.
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            ):(
                                <div className="flex flex-col gap-1 justify-center items-center">
                                    <span className="flex gap-2 items-center text-foreground-1 p-2 rounded-lg hover:bg-shade-3">
                                        <button onClick={() => console.log("Logs")} className="w-full text-foreground-1 font-medium">
                                            <ScrollText className="text-primary size-6" />
                                        </button>
                                    </span>
                                </div>
                            )
                        }
                        
                        <hr className="border-shade-2 w-full" />

                        {
                            showSidebar ? (
                                <section>
                                    <ul className="flex flex-col gap-2">
                                        <li className="flex gap-2 items-center text-foreground-1 w-full rounded-lg hover:bg-shade-3 p-1 px-2">
                                            <button onClick={() => setShowFeedback(!showFeedback)} className="flex gap-2 items-center text-foreground-1 text-xl font-medium">
                                                <MessageSquareText className="text-primary size-6" />
                                                Feedback
                                            </button>
                                        </li>
                                        <li className="flex gap-2 items-center text-foreground-1 w-full rounded-lg hover:bg-shade-3 p-1 px-2">
                                            <Link href="/settings" className="flex gap-2 items-center text-foreground-1 text-xl font-medium">
                                                <Cog className="text-primary size-6" />
                                                Settings
                                            </Link>
                                        </li>
                                    </ul>
                                </section>
                            ) : (
                                <div className="flex flex-col gap-1 justify-center items-center">
                                    <span className="flex gap-2 items-center text-foreground-1 p-2 rounded-lg hover:bg-shade-3">
                                        <button onClick={() => setShowFeedback(!showFeedback)} className="w-full text-foreground-1 font-medium">
                                            <MessageSquareText className="text-primary size-6" />
                                        </button>
                                    </span>
                                    <span className="flex gap-2 items-center text-foreground-1 p-2 rounded-lg hover:bg-shade-3">
                                        <Link href="/settings" className="w-full text-foreground-1 font-medium">
                                            <Cog className="text-primary size-6" />
                                        </Link>
                                    </span>
                                </div>
                            )
                        }
                    </div>
                </aside>
            </div>
        </>
    );
};

export default AppSidebar;