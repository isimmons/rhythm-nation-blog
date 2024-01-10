<script lang="ts">
  import type { Emoji } from "~/types/emoji";
  import {
    faThumbsUp,
    faStar,
    faRocket,
    faHeart,
  } from "@fortawesome/free-solid-svg-icons";
  import { Fa } from "svelte-fa";
  import { redirectTo } from "~/utils";

  const nameToIcon = {
    thumbsup: faThumbsUp,
    star: faStar,
    rocket: faRocket,
    heart: faHeart,
  };

  export let emoji: Emoji;
  export let reacted: boolean;
  export let count: number;
  export let post: string;

  const handleReaction = async () => {
    try {
      const res = await fetch("/api/reaction", {
        method: "POST",
        body: JSON.stringify({ emoji, post }),
      });

      if (res.ok) {
        if (reacted) {
          count--;
          reacted = false;
        } else {
          count++;
          reacted = true;
        }
      } else if (res.status === 401) {
        redirectTo("/login");
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };
</script>

<button
  on:click={handleReaction}
  class={`w-16 flex gap-x-1 justify-center items-center text-gray-500 cursor-pointer hover:scale-110 transition-transform ${
    reacted
      ? "text-teal-700 border-2 border-teal-900 bg-teal-50 py-2 rounded-full"
      : ""
  }`}
>
  <Fa icon={nameToIcon[emoji]} />
  <span class="text-sm">
    {#if count > 0}
      {count}
    {/if}
  </span>
</button>
