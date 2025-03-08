import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";

import DashHeader from "../components/DashHeader";
import { Timeline } from "antd";
import LinkImg from "../assets/images/commission-img.png";

const { Content } = Layout;

const LinkCode = () => {
  return (
    <LayoutWrapper>
      <LayoutComp>
        <DashHeader />
        <ContentComp>
          <BreadcrumbComp>Link Code</BreadcrumbComp>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div className="timeline-rules">
              <h4>Affiliate rule</h4>
              <Timeline
                items={[
                  {
                    children: "Share your invitation link with your friends.",
                  },
                  {
                    children:
                      "Users complete registration through invitation link.",
                  },
                  {
                    children:
                      "Invited users deploy hosts and continue to use them, generating consumption bills.",
                  },
                  {
                    children:
                      "10% of the amount consumed by invited users will become your commission.",
                  },
                  {
                    children:
                      "View invitation and monthly commission status through Affiliate Stats.",
                  },
                ]}
              />
            </div>

            <div className="link">
              <img src={LinkImg} alt="" />
            </div>
          </div>
        </ContentComp>
      </LayoutComp>
    </LayoutWrapper>
  );
};

export default LinkCode;

const LayoutWrapper = styled(Layout)`
  min-height: 100vh;

  p {
    width: 80ch;
    line-height: 2rem;
    font-weight: 500;
    color: var(--text-color);
  }

  /* .timeline-rules {
    width: 50%;
  } */
  .link {
    img {
      width: 500px;
      height: auto;
    }
  }
  @media (max-width: 768px) {
    min-height: 60vh;
  }
`;

const LayoutComp = styled(Layout)`
  padding: 0 16px;
  background-color: white;

  @media (max-width: 640px) {
    width: 200%;
  }
`;

const BreadcrumbComp = styled(Breadcrumb)`
  margin: 16px 0;
  font-size: var(--m-heading);
  color: black;
  font-weight: 500;
`;

const ContentComp = styled(Content)`
  margin: 0 16px;

  @media (max-width: 640px) {
    width: 200%;
  }
`;
