import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { createImage } from "~/models/image.server";
import { requireUserId } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  await createImage({ userId });

  return redirect(`/`);
};

export default function NewImagesPage() {
  return (
    <div>
      <h3 className="text-2xl font-bold">New Image</h3>
      <p className="py-6">Upload a new image</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Upload
        </button>
      </Form>
    </div>
  );
}
