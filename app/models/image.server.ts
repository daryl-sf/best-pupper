import arc from "@architect/functions";
import { createId } from "@paralleldrive/cuid2";

import type { User } from "./user.server";

export interface Image {
  id: ReturnType<typeof createId>;
  userId: User["id"];
}

interface ImageItem {
  pk: User["id"];
  sk: `image#${Image["id"]}`;
}

const skToId = (sk: ImageItem["sk"]): Image["id"] => sk.replace(/^image#/, "");
const idToSk = (id: Image["id"]): ImageItem["sk"] => `image#${id}`;

export async function getImage({
  id,
  userId,
}: Pick<Image, "id" | "userId">): Promise<Image | null> {
  const db = await arc.tables();

  const result = await db.image.get({ pk: userId, sk: idToSk(id) });

  if (result) {
    return {
      userId: result.pk,
      id: result.sk,
    };
  }
  return null;
}

export async function getImageListItems({
  userId,
}: Pick<Image, "userId">): Promise<Pick<Image, "id">[]> {
  const db = await arc.tables();

  const result = await db.image.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return result.Items.map((n: any) => ({
    id: skToId(n.sk),
  }));
}

export async function createImage({
  userId,
}: Pick<Image, "userId">): Promise<Image> {
  const db = await arc.tables();

  const id = createId();

  await db.image.put({
    pk: userId,
    sk: idToSk(id),
  });

  return {
    id,
    userId,
  };
}
