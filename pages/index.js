import Case from "case";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  var Moon = {
    phase: function (year, month, day) {
      var e,
        jd,
        b,
        c = 0;

      if (month < 3) {
        year--;
        month += 12;
      }

      ++month;
      c = 365.25 * year;
      e = 30.6 * month;
      jd = c + e + day - 694039.09; // jd is total days elapsed
      jd /= 29.5305882; // divide by the moon cycle
      b = parseInt(jd); // int(jd) -> b, take integer part of jd
      jd -= b; // subtract integer part to leave fractional part of original jd
      b = Math.round(jd * 8); // scale fraction from 0-8 and round

      if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0

      switch (b) {
        case 0:
          return {emoji:"🌑" ,name:"new-moon"};
        case 1:
          return {emoji:"🌒" ,name:"waxing-crescent-moon"};
        case 2:
          return {emoji:"🌓" ,name:"quarter-moon"};
        case 3:
          return {emoji:"🌔" ,name:"waxing-gibbous-moon"};
        case 4:
          return {emoji:"🌕" ,name:"full-moon"};
        case 5:
          return {emoji:"🌖" ,name:"waning-gibbous-moon"};
        case 6:
          return {emoji:"🌗" ,name:"last-quarter-moon"};
        case 7:
          return {emoji:"🌘" ,name:"waning-crescent-moon"};
      }
    },
  };

  const today = new Date();
  const answer =
    Moon.phase(today.getFullYear(), today.getMonth() + 1, today.getDate()).name ===
    "full-moon";
  const phase = 
    Moon.phase(today.getFullYear(), today.getMonth() + 1, today.getDate());

  return (
    <div className={styles.container}>
      <Head>
        <title>Is it full moon today?</title>
        <meta
          name="description"
          content="This website provides information on whether or not it is full moon today"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.description}>Is it full moon today?</h1>
        <div>
          <h2 className={styles.title}>{answer ? 'YES!' : 'NO'}</h2>
          <h3>It is {phase.emoji}{Case.lower(phase.name)}{phase.emoji} today.</h3>
        </div>
      </main>
    </div>
  );
}
