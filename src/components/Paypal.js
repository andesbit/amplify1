import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function App() {
  const initialOptions = {
    "client-id": "TU_CLIENT_ID_AQUI", // Reemplaza con tu ID real
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", // Monto a cobrar
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Transacción completada por ${details.payer.name.given_name}`);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
