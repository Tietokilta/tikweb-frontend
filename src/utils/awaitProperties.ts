type AwaitedObject<T extends { [key: string]: unknown }> = {
  [key in keyof T]: Awaited<T[key]>
}

export default async function awaitProperties<
  T extends { [key: string]: unknown }
>(obj: T): Promise<AwaitedObject<T>> {
  return Object.fromEntries(
    await Promise.all(
      Object.entries(obj).map(async ([key, val]) => [key, await val])
    )
  )
}
