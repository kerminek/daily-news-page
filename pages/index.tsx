import AgencyBanner from "@/components/AgencyBanner";
import CreditsBanner from "@/components/CreditsBanner";
import NasaComponent from "@/components/NasaComponent";
import NytComponent from "@/components/NytComponent";
import ReutersComponent from "@/components/ReutersComponent";
import useHandleOldData from "@/components/useHandleOldData";
import Head from "next/head";
import Parser from "rss-parser";

export default function Home(props: any) {
  const { nyt, reuters, nasa, fetchedAt } = props;

  useHandleOldData(fetchedAt);

  return (
    <main className="sm:min-h-screen font-serif">
      <Head>
        <title>The News Page</title>
        <meta name="author" content="Jakub Krwawicz" />
        <meta name="description" content="The News Page - Your daily briefing." />
      </Head>
      <section className="container mx-auto px-4 lg:px-8 pb-20 flex flex-wrap gap-x-4 lg:gap-x-8">
        {/* left side */}
        <NytComponent nyt={nyt} />
        {/* right side */}
        <div className="flex-1 min-w-[65%]" id="nasa">
          <div className="flex flex-col gap-y-4 lg:gap-y-8">
            <AgencyBanner agencyName="Reuters Business" />
            <div className="flex flex-col gap-y-5 sm:gap-y-10">
              <div className="flex flex-wrap gap-4">
                <div className="min-w-[65%] flex-1">
                  <ReutersComponent reuters={reuters} from={0} to={2} />
                </div>
                <NasaComponent nasa={nasa} />
              </div>
              <ReutersComponent reuters={reuters} from={2} to={5} />
            </div>
          </div>
        </div>
      </section>
      <CreditsBanner />
    </main>
  );
}

export async function getStaticProps() {
  const parser = new Parser();
  const nytRes = await parser.parseURL("https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml");
  const reutersRes = await parser.parseURL(
    "https://www.reutersagency.com/feed/?best-topics=business-finance&post_type=best"
  );
  const nasaRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}`).then((res) =>
    res.json()
  );

  // for testing
  const nasaTestRes = {
    hdurl: "https://apod.nasa.gov/apod/image/2304/hubble_ngc2419_potw1908a.jpg",
    url: "https://apod.nasa.gov/apod/image/2304/hubble_ngc2419_potw1908a_1024.jpg",
    explanation:
      "Stars of the globular cluster NGC 2419 are packed into this Hubble Space Telescope field of view toward the mostly stealthy constellation Lynx. The two brighter spiky stars near the edge of the frame are within our own galaxy. NGC 2419 itself is remote though, some 300,000 light-years away. In comparison, the Milky Way's satellite galaxy, the Large Magellanic Cloud, is only about 160,000 light-years distant. Roughly similar to other large globular star clusters like Omega Centauri, NGC 2419 is intrinsically bright, but appears faint because it is so far away. Its extreme distance makes it difficult to study and compare its properties with other globular clusters that roam the halo of our Milky Way galaxy. Sometimes called \"the Intergalactic Wanderer\", NGC 2419 really does seem to have come from beyond the Milky Way. Measurements of the cluster's motion through space suggest it once belonged to the Sagittarius dwarf spheroidal galaxy, another small satellite galaxy being disrupted by repeated encounters with the much larger Milky Way.",
    title: "NGC 2419: Intergalactic Wanderer",
    copyright: "Tunc Tezel",
  };

  const fetchedAt = new Date().getTime();

  console.log("Last time fetched: " + new Date(fetchedAt).toDateString());

  const isProd = process.env.NODE_ENV === "production";

  return {
    props: {
      nyt: nytRes.items.slice(0, 11),
      reuters: reutersRes.items,
      nasa: isProd ? nasaRes : nasaTestRes,
      fetchedAt,
    },
    revalidate: 60 * (Number(process.env.NEXT_PUBLIC_REVALIDATE_MINUTES) || 15),
  };
}
