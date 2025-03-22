import styled from "styled-components"
import { useGetAffiliateStatsQuery } from "../../redux/apis/affiliate"

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

export default function AffiliateStats() {
  const { isLoading, data } = useGetAffiliateStatsQuery()

  return <StatsContainer></StatsContainer>
}
