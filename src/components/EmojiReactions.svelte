<script lang="ts">
  import { emojiList, type ReactionsDetails } from "~/types/emoji";
  import EmojiReaction from "./EmojiReaction.svelte";

  export let post: string;
  export let reactionsDetails: ReactionsDetails;
</script>

<div class="flex gap-x-2 justify-center items-center h-8">
  {#each emojiList as emoji}
    <EmojiReaction
      {post}
      {emoji}
      reacted={reactionsDetails[emoji].reacted}
      count={reactionsDetails[emoji].count}
    />
  {/each}
</div>
