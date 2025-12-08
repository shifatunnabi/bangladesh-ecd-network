import Image from "next/image"

export function PartnersSection() {
  return (
    <section className="w-full flex justify-center">
      <Image
        src="/images/partners/key-partners.jpg"
        alt="our key partners"
        width={1920}
        height={1080}
        className="w-full h-auto max-w-7xl"
      />
    </section>
  )
}
