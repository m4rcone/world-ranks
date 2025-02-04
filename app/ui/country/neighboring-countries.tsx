import Image from "next/image";
import { fetchCountryByCode } from "../../lib/data";

export default async function NeighboringCountries({
  neighbors,
}: {
  neighbors: [] | null;
}) {
  let neighboringCountries;
  if (neighbors) {
    neighboringCountries = await Promise.all(
      neighbors.map((neighbor) => fetchCountryByCode(neighbor)),
    );
  } else {
    neighboringCountries = null;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">Neighboring Countries</p>
      <div className="flex flex-wrap gap-4">
        {neighboringCountries ? (
          neighboringCountries.flat().map((neighbor) => (
            <div
              key={neighbor.cca3}
              className="flex flex-col items-center justify-center gap-1"
            >
              <Image
                width={96}
                height={96}
                src={neighbor.flags?.svg}
                alt={`Flag of ${neighbor.name?.common}`}
              />
              <p className="text-xs">{neighbor.name?.common}</p>
            </div>
          ))
        ) : (
          <p className="text-xs">No neighboring countries.</p>
        )}
      </div>
    </div>
  );
}
