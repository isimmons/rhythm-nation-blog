<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import contactFormSchema from "~/schemas/contactFormSchema";
  import { redirectTo } from "~/utils";

  let errors: {
    comment?: string[];
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    alert("you submitted the contact form");

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const data = contactFormSchema.safeParse(formData);

    // now before redirecting lets actually send this to the backend and make sure it passes there.
    if (data.success) redirectTo("/thankyou");

    if (!data.success) {
      console.log(data.error.flatten());
      errors = data.error.flatten().fieldErrors;
    }
  };
</script>

<form
  novalidate
  on:submit={handleSubmit}
  class="grid gap-y-2"
>
  <label
    for="comment"
    class="text-zinc-900 text-2xl mb-2 mt-10"
  >
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
