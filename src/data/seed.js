// Starting data for the app. Returns fresh objects each call.

export function getSeedData() {
  const belgiumResult = {
    id: 1, country: "Belgium", stage: "Mettet Circuit",
    time: "1:24.634", conditions: "Clear", pb: true
  };

  const australiaResult = {
    id: 2, country: "Australia", stage: "Mount Kaye Pass",
    time: "3:58.223", conditions: "Clear", pb: true, position: 4
  };

  const events = [
    {
      id: 1, name: "Career Rallycross", rank: "Clubman", car: "Ford Fiesta R5",
      place: "12th Place", country: "Belgium", nextStage: "Mettet Circuit",
      stageCount: 6, progress: 0, results: []
    },
    {
      id: 2, name: "Career Rally", rank: "Semi-Pro", car: "Subaru Impreza 1995",
      place: "4th Place", country: "Australia", nextStage: "Mount Kaye Pass",
      stageCount: 6, progress: 17, results: [australiaResult]
    },
    {
      id: 3, name: "Weekly Challenge", rank: "Pro", car: "Ford Escort Mk II",
      place: "321st Place", country: "Argentina", nextStage: "La Merced",
      stageCount: 6, progress: 0, results: []
    }
  ];

  return { events, results: [belgiumResult, australiaResult] };
}