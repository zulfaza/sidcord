export default function StringToSlug(Text, separator = "-") {
  return Text.toLowerCase()
    .replace(/ /g, separator)
    .replace(/[^\w-]+/g, "");
}
