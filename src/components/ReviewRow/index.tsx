interface Props {
  highlight?: boolean;
  eastText: string;
  westText: string;
}

export function ReviewRow({ eastText, highlight, westText }: Props) {
  return (
    <div className="flex justify-between mb-4">
      <span className="text-main-light">{eastText}</span>
      <span
        className={
          highlight ? 'text-lg text-main-grey font-semibold' : 'text-base text-main-grey'
        }
      >
        {westText}
      </span>
    </div>
  );
}
