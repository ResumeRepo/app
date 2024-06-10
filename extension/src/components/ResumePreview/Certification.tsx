export type CertificationProps = {
  title?: string,
  certifications?: string[]
}
export default function Certification(props: CertificationProps) {

    return (
      <div>
        <h2 className="section-title mb-1 border-b-2 border-gray-300">{props.title}</h2>
        <ul className="sub-content list-disc ul-padding">
            {props.certifications?.map((certification, index) => (
                <li key={index}>{certification}</li>
            ))}
        </ul>
      </div>
    );
  };
