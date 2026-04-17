module {
  public type CharacterId = Nat;

  public type AvatarStyle = {
    #anime;
    #realistic;
    #illustrated;
    #pixelArt;
    #watercolor;
  };

  public type PersonalityType = {
    #introverted;
    #extroverted;
    #analytical;
    #creative;
    #empathetic;
    #adventurous;
    #mysterious;
    #playful;
  };

  public type Trait = Text;

  // Internal mutable record — used in canister state
  public type CharacterInternal = {
    id : CharacterId;
    var name : Text;
    var avatarStyle : AvatarStyle;
    var personalityType : PersonalityType;
    var personalityDescription : Text;
    var traits : [Trait];
    var backgroundSnippet : Text;
    createdAt : Int;
    isPreseeded : Bool;
  };

  // Immutable shared type — used in public API responses
  public type Character = {
    id : CharacterId;
    name : Text;
    avatarStyle : AvatarStyle;
    personalityType : PersonalityType;
    personalityDescription : Text;
    traits : [Trait];
    backgroundSnippet : Text;
    createdAt : Int;
    isPreseeded : Bool;
  };

  public type CreateCharacterRequest = {
    name : Text;
    avatarStyle : AvatarStyle;
    personalityType : PersonalityType;
    personalityDescription : Text;
    traits : [Trait];
    backgroundSnippet : Text;
  };

  public type CharacterFilter = {
    personalityType : ?PersonalityType;
    trait : ?Trait;
    searchQuery : ?Text;
  };
};
