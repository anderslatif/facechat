import Filter from "bad-words";
const filter = new Filter();

export default function filterProfanity(message) {
    return filter.clean(message);
}
