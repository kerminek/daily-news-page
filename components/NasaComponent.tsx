type Props = {
  nasa: any;
};

const NasaComponent = (props: Props) => {
  const { nasa } = props;

  return (
    <div className="min-w-[16rem] flex-1 place-self-center">
      <h2 className="text-sm font-semibold text-center mb-1">NASA&apos;s Picture of the day</h2>
      <a className="relative inline-block h-full w-full" href={nasa?.hdurl} target="_blank">
        <div
          className="min-h-[16rem] min-w-[16rem] flex justify-center border-double border-4"
          style={{
            backgroundImage: `url(${nasa?.url})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {nasa?.error ? (
            <span className="text-red-600 text-sm font-bold font-mono absolute bottom-2">
              NASA`s API ERROR <br /> OLD IMAGE INSTEAD
            </span>
          ) : (
            <span className="text-white absolute bottom-2 font-mono mix-blend-difference lg:hidden">
              click for better quality
            </span>
          )}
        </div>
        <h5 className="text-white text-xs font-medium absolute top-2 right-2 w-fit mix-blend-difference">
          Copyright: {nasa.copyright || "NASA"}
        </h5>
      </a>
    </div>
  );
};

export default NasaComponent;
