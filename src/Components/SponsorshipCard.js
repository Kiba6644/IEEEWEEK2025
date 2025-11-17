import React from 'react';
import styled from 'styled-components';

const SponsorCard = ({ sponsor }) => {
  const { name, website, logo, category } = sponsor;

  return (
    <SponsorCardWrapper className={`sponsor-card ${category.toLowerCase()}`}>
      <div className="sponsor-logo">
        <a href={website} target="_blank" rel="noopener noreferrer">
          <img src={logo} alt={`${name} logo`} />
        </a>
      </div>
      <div className="sponsor-info">
        <h3>{name}</h3>
        <span className="sponsor-category">{category} Sponsor</span>
      </div>
    </SponsorCardWrapper>
  );
};

const SponsorCardWrapper = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }

  .sponsor-logo {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .sponsor-info {
    h3 {
      margin: 10px 0 5px;
      color: #333;
    }

    .sponsor-category {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 15px;
      font-size: 0.8em;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  /* Category-specific styles */
  &.title .sponsor-category {
    background-color: #ffd700;
    color: #000;
  }

  &.diamond .sponsor-category {
    background-color: #b9f2ff;
    color: #000;
  }

  &.gold .sponsor-category {
    background-color: #ffd700;
    color: #000;
  }

  &.silver .sponsor-category {
    background-color: #c0c0c0;
    color: #000;
  }

  &.bronze .sponsor-category {
    background-color: #cd7f32;
    color: #fff;
  }
`;

export default SponsorCard;