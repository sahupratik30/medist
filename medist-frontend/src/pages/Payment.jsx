import { useSelector } from "react-redux";
import { PaymentDetails } from "../components";
import StoreDetails from "../components/StoreDetails";
import Card from "../components/UI/Card";

const Payment = () => {
  const pharmacies = useSelector((state) => state?.pharmacies);

  return (
    <div className="mx-auto my-6 max-w-[996px] px-4">
      <h1 className="mb-10 text-lg font-semibold xs:text-xl s:text-2xl">
        Stores near you
      </h1>
      <div className="flex flex-col justify-center gap-4 lg:flex-row lg:items-start lg:justify-start">
        <Card className="p-4 lg:flex-[0.7]">
          <h2 className="mb-5 text-[12px] text-dark-grey xs:text-sm">
            SELECT A STORE TO PROCEED
          </h2>
          {pharmacies?.map((pharmacy, index) => (
            <StoreDetails
              key={index}
              name={pharmacy?.name}
              address={pharmacy?.address}
              isOpen={pharmacy?.isOpen}
            />
          ))}
        </Card>
        <PaymentDetails forPayment={true} />
      </div>
    </div>
  );
};

export default Payment;
