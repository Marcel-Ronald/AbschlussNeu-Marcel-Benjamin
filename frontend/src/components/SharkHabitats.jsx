import React from "react";

const SharkHabitats = () => {
  const habitats = [
    {
      id: 1,
      name: "Great Barrier Reef, Australien",
      description:
        "Heimat verschiedener Haiarten, einschließlich Riffhaie und Walhaie",
      image:
        "https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg?auto=compress&cs=tinysrgb&w=600",
      sharkTypes: "Riffhaie, Walhaie",
    },
    {
      id: 2,
      name: "Galapagos-Inseln, Ecuador",
      description: "Berühmt für Hammerhaie und Walhaie",
      image:
        "https://images.pexels.com/photos/18631595/pexels-photo-18631595.jpeg?auto=compress&cs=tinysrgb&w=600",
      sharkTypes: "Hammerhaie, Walhaie",
    },
    {
      id: 3,
      name: "Guadalupe Island, Mexiko",
      description: "Am bekanntesten für Begegnungen mit Weißen Haien",
      image:
        "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600",
      sharkTypes: "Weiße Haie",
    },
    {
      id: 4,
      name: "Malediven",
      description: "Kristallklare Gewässer, Heimat von Walhaien und Riffhaien",
      image:
        "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=600",
      sharkTypes: "Walhaie, Riffhaie",
    },
    {
      id: 5,
      name: "Südafrika Küste",
      description: "Bekannt für Weiße Haie und vielfältiges Meeresleben",
      image:
        "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=600",
      sharkTypes: "Weiße Haie, Tigerhaie",
    },
    {
      id: 6,
      name: "Bahamas",
      description: "Tigerhaie und Karibische Riffhaie gedeihen hier",
      image:
        "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=600",
      sharkTypes: "Tigerhaie, Karibische Riffhaie",
    },
  ];

  return (
    <div className="habitats-container">
      <h2 className="habitats-title">🌊 Hai-Lebensräume auf der Welt</h2>
      <p className="habitats-intro">
        Entdecke die wunderschönen Inseln und Küstenregionen, in denen Haie
        leben und in ihrem natürlichen Lebensraum gedeihen
      </p>

      <div className="habitats-grid">
        {habitats.map((habitat) => (
          <div key={habitat.id} className="habitat-card">
            <div className="habitat-image-container">
              <img
                src={habitat.image}
                alt={habitat.name}
                className="habitat-image"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x250/0077cc/ffffff?text=Ocean+Habitat";
                }}
              />
              <div className="habitat-overlay">
                <span className="shark-types">{habitat.sharkTypes}</span>
              </div>
            </div>
            <div className="habitat-content">
              <h3 className="habitat-name">{habitat.name}</h3>
              <p className="habitat-description">{habitat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharkHabitats;
