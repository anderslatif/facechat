import Filter from "bad-words";
const filter = new Filter();

export default function filterProfanity(message) {
    try {
        return filter.clean(message);
    } catch (error) {
        // because regex cannot handle / and \ characters. 
        return message;
    }
}

