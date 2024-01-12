type Props = {
  agencyName: string;
};

const AgencyBanner = (props: Props) => {
  const { agencyName } = props;

  return <h2 className="text-2xl font-semibold text-center py-2 border-b sticky top-0 bg-white z-10">{agencyName}</h2>;
};

export default AgencyBanner;
