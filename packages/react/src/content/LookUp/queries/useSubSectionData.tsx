import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useSelectionsContext } from "../../context/selectionsContext";

const QUERY = gql`
  query GetStatSubSectionNames($mainSectionName: String!) {
    statSubSectionNames(mainSectionName: $mainSectionName) {
      name
    }
  }
`;

const useSubSectionData = () => {
	const { selectedMainSectionName } = useSelectionsContext()

	const [load, response] = useLazyQuery<{ statSubSectionNames: { name: string }[] }>(QUERY, {
		variables: { mainSectionName: selectedMainSectionName },
	});

	useEffect(() => {
		console.log({ selectedMainSectionName })
		load()
	}, [selectedMainSectionName])

	return response
}

export default useSubSectionData