export type LanguageProps = {
  title: string,
  languages: string[]
}
export default function Language(props: LanguageProps) {
  return ((
      <div>
        <h2 className="section-title mb-1 border-b-2 border-gray-300">
          {props.title}
        </h2>
        <p className="sub-content">{props.languages.join(", ")}</p>
      </div>
    )
  );
}
