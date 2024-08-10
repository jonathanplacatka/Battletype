export default function generateGuestName() {
    return "guest" + (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
}