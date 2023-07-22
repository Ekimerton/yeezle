import React, { useEffect } from "react";
import { notification } from "antd";
import Timer from "@/components/Timer";
import Confetti from "@/components/Confetti";
import { generateShareableString } from "@/app/utils";

function NotificationComponent({ target, previousGuesses }) {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    console.log("fuck");
    if (!target || !previousGuesses) return;

    if (previousGuesses.length > 0 && previousGuesses[0].name === target.name) {
      api.open({
        message: "Congrats!!",
        description: (
          <div>
            <Confetti />
            <p>
              Today&apos;s recipe was {target.name}. You got today&apos;s recipe
              in {previousGuesses.length}!
            </p>
            <a
              onClick={() => {
                navigator.clipboard.writeText(
                  generateShareableString(previousGuesses, target.ingredients)
                );
              }}
            >
              <p>Copy shareable text</p>
            </a>
            <Timer isModalActive={true} />
          </div>
        ),
        duration: 0,
      });
    } else if (previousGuesses.length >= 5) {
      api.open({
        message: "You sux!!",
        description: (
          <div>
            <p>
              Today&apos;s recipe was {target.name}. You sux farts out of my
              ass!
            </p>
            <Timer isModalActive={true} />
          </div>
        ),
        duration: 0,
      });
    }
  }, [target, previousGuesses]);

  return contextHolder;
}

export default NotificationComponent;
