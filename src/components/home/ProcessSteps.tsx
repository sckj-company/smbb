import Step from "./ui/step";

export default function ProcessSteps() {
  const steps = [
    "Abre a página de checkout no telemóvel",
    "Vê os dados de transferência de pagamento móvel",
    "Envie o comprovativo com o seu email de doador"
  ];

  return (
    <ul className="grid gap-3">
      {steps.map((step, index) => (
        <Step key={index} step={step} />
      ))}
    </ul>
  );
}
