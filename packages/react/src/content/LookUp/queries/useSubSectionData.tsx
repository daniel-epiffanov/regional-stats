import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { StatSubSectionNames } from "../../../../../../sharedTypes/gqlQueries";
import { useSelectionsContext } from "../../context/curValuesContext";

const QUERY = gql`
  query GetStatSubSectionNames($mainSectionName: String!) {
    statSubSectionNames(mainSectionName: $mainSectionName) {
      name,
			children {
				name
			}
    }
  }
`;

const useSubSectionData = () => {
	const { curMainSectionName: selectedMainSectionName } = useSelectionsContext()

	const [load, response] = useLazyQuery<{ statSubSectionNames: StatSubSectionNames }>(QUERY, {
		variables: { mainSectionName: selectedMainSectionName },
	});

	useEffect(() => {
		console.log({ selectedMainSectionName })
		load()
	}, [selectedMainSectionName])

	return response
}

export default useSubSectionData