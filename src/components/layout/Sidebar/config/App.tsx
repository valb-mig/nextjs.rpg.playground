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
    X
} from "lucide-react";

const AppSidebar = () => {

    const [ showFeedback, setShowFeedback ] = useState(false);

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

            <aside className="flex flex-col w-64 bg-shade-4 justify-between">

                <section className="flex flex-col gap-2 p-2">
                    <div className="flex gap-2 items-center justify-center text-foreground-1 text-lg font-medium">
                        Menu
                    </div>
                    <ul>
                        <li className="flex gap-2 items-center text-foreground-1 text-2xl font-medium">
                            <Link href="/dashboard" className="flex gap-2 items-center text-foreground-1 text-sm font-medium">
                                <Home className="text-primary size-4" />
                                Home
                            </Link>
                        </li>
                        <li className="flex gap-2 items-center text-foreground-1 text-2xl font-medium">
                            <Link href="/friends" className="flex gap-2 items-center text-foreground-1 text-sm font-medium">
                                <Users className="text-primary size-4" />
                                Friends
                            </Link>
                        </li>
                    </ul>
                </section>


                <section>
                    <div className="flex gap-2 items-center justify-center text-foreground-1 text-lg font-medium">
                        Help
                    </div>
                    <ul>
                        <li className="flex gap-2 items-center text-foreground-1 text-2xl font-medium">
                            <button className="flex gap-2 items-center text-foreground-1 text-sm font-medium" onClick={() => setShowFeedback(!showFeedback)}>
                                <MessageSquareText className="text-primary size-4" />
                                Feedback
                            </button>
                        </li>
                        <li className="flex gap-2 items-center text-foreground-1 text-2xl font-medium">
                            <Link href="/settings" className="flex gap-2 items-center text-foreground-1 text-sm font-medium">
                                <Cog className="text-primary size-4" />
                                Settings
                            </Link>
                        </li>
                    </ul>
                </section>
            </aside>
        </>
    );
};

export default AppSidebar;