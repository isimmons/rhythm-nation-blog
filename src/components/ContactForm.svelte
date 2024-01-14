<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import contactFormSchema from "~/schemas/contactFormSchema";
  import { redirectTo } from "~/utils";

  let errors: {
    comment?: string[];
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const validated = contactFormSchema.safeParse(formData);

    if (validated.success) {
      const siteUrl = window.location.origin;
      const res = await fetch(`${siteUrl}/api/contact`, {
        method: "POST",
        body: JSON.stringify(formData.comment),
        headers: {
          "content-type": "application/json",
        },
      });

      if (res.ok) redirectTo("/thankyou");
    }

    if (!validated.success) {
      console.log(validated.error.flatten());
      errors = validated.error.flatten().fieldErrors;
    }
  };
</script>

<form novalidate on:submit={handleSubmit} class="grid gap-y-2">
  <label for="comment" class="text-zinc-900 text-2xl mb-2 mt-10">
    What's on your mind?
  </label>

  <textarea
    name="comment"
    id="comment"
    rows="3"
    required
    maxlength="255"
    class="border border-teal-900 rounded-lg text-2xl px-6 py-6"
  />
  {#if errors?.comment}
    <span>{errors.comment}</span>
  {/if}
  <button
    type="submit"
    class="text-2xl text-zinc-100 bg-teal-900 px-6 py-5 rounded-xl my-1"
    >Send</button
  >
</form>
