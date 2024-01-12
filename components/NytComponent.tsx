import borderOnResize from "@/utils/borderOnResize";
import AgencyBanner from "./agencyBanner";

type Props = any;

const NytComponent = (props: Props) => {
  const { nyt } = props;

  const isSameSize = borderOnResize("nyt", "nasa");

  return (
    <div
      className={`flex flex-col h-full gap-y-4 lg:gap-y-8 px-2 flex-grow w-[18rem] ${!isSameSize && "border-r pr-8"}`}
      id="nyt"
    >
      <AgencyBanner agencyName="NYT News" />
      {/* px-1 to avoid outliering pixels in safari */}
      <div className="flex flex-col gap-2 px-1">
        {nyt.slice(0, 4).map((item: any, index: number) => (
          <div
            className={`border-b pb-2 sm:pb-4 ${!isSameSize && "last:border-b-0"}`}
            style={{ fontSize: `clamp(${20 - index * 2}px,${3 - index * 0.3}vw,${24 - index * 2}px)` }}
            key={item.title}
          >
            <div className="flex justify-between gap-5 text-gray-900 font-medium text-[0.5em]">
              <span className="line-clamp-1">{item.creator}</span>
              <span className="whitespace-nowrap">{new Date(item.pubDate).toDateString()}</span>
            </div>
            <a className="inline-block group" href={item.link} target="_blank">
              <h3 className="font-semibold text-[1em] text-gray-800 mb-1 group-hover:text-zinc-500 transition ease-in">
                {item.title}
              </h3>
              <p className="font-light text-[0.7em] text-gray-600">{item.content}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NytComponent;
