// Turn the flat cars list into [{ name, cars: [...] }] for <optgroup>s
export function groupCars(cars) {
  const groups = [];
  for (const car of cars) {
    let group = groups.find(g => g.name === car.group);
    if (!group) {
      group = { name: car.group, cars: [] };
      groups.push(group);
    }
    group.cars.push(car);
  }
  return groups;
}