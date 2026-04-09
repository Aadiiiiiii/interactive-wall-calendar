import Image from "next/image";

type HeroProps = {
  currentDate: Date;
};

export default function Hero({ currentDate }: HeroProps) {
  const monthIndex = currentDate.getMonth();
  const month = currentDate.toLocaleString("en-US", { month: "long" });
  const year = currentDate.getFullYear();

  const getThemeData = () => {
    if ([11, 0, 1].includes(monthIndex)) {
      return {
        image: "/winter.jpg",
        season: "Winter",
      };
    }

    if ([2, 3, 4].includes(monthIndex)) {
      return {
        image: "/spring.jpg",
        season: "Spring",
      };
    }

    if ([5, 6, 7].includes(monthIndex)) {
      return {
        image: "/summer.jpg",
        season: "Summer",
      };
    }

    return {
      image: "/autumn.jpg",
      season: "Autumn",
    };
  };

  const theme = getThemeData();

  return (
    <section className="hero-sheet">
      <div className="hero-image-wrapper">
        <Image
          src={theme.image}
          alt={`${theme.season} wall calendar hero`}
          fill
          sizes="(max-width: 768px) 100vw, 820px"
          priority
          className="hero-image"
        />
        <div className="hero-overlay" />

        <div className="calendar-rings">
          <span className="ring" />
          <span className="ring" />
        </div>

        <div className="hero-content">
          <p className="hero-label">Calendar</p>
          <h1 className="hero-title">{month}</h1>
          <p className="hero-year">{year}</p>
          <p className="hero-season">{theme.season}</p>
        </div>
      </div>
    </section>
  );
}
