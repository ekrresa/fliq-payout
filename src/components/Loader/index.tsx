import { ReactComponent as LoaderImg } from '../../assets/images/loader.svg';

export function Loader() {
  return (
    <div className="mx-auto w-24">
      <LoaderImg className="animate-spin-slow" />
      <p className="mt-10 text-lg text-purple-normal text-center">Loading...</p>
    </div>
  );
}
