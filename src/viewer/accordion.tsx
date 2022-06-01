import { PropsWithChildren, useState } from "react";
interface AccordionProps {
  title: string;
}

export const Accordion = ({title, children}: PropsWithChildren<AccordionProps>): JSX.Element | null => {
  
  let currentTitle = title;
  const [open, setOpen] = useState<boolean>(false);
  
  const onClickHandler = (): void => {
    setOpen(!open);
  };

  let className: string = 'hidden';
  if (open) {
    currentTitle = 'Click to close the panel';
    className = 'p-1';
  }

  return (
    <div className="w-90 m-2">
      <h2 className="cursor-pointer p-4 bg-slate-400" onClick={onClickHandler}>{currentTitle}</h2>
      <div className={className}>
        {children}
      </div>
    </div>
  );
}