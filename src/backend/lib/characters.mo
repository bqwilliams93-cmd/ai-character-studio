import Types "../types/characters";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type Character = Types.Character;
  public type CharacterInternal = Types.CharacterInternal;
  public type CharacterId = Types.CharacterId;
  public type CreateCharacterRequest = Types.CreateCharacterRequest;
  public type CharacterFilter = Types.CharacterFilter;
  public type PersonalityType = Types.PersonalityType;
  public type Trait = Types.Trait;

  /// Convert internal mutable record to immutable shared type
  public func toPublic(self : CharacterInternal) : Character {
    {
      id = self.id;
      name = self.name;
      avatarStyle = self.avatarStyle;
      personalityType = self.personalityType;
      personalityDescription = self.personalityDescription;
      traits = self.traits;
      backgroundSnippet = self.backgroundSnippet;
      createdAt = self.createdAt;
      isPreseeded = self.isPreseeded;
    };
  };

  /// Return all characters as immutable shared records
  public func listAll(characters : List.List<CharacterInternal>) : [Character] {
    characters.map<CharacterInternal, Character>(toPublic).toArray();
  };

  /// Get a single character by ID
  public func getById(characters : List.List<CharacterInternal>, id : CharacterId) : ?Character {
    switch (characters.find(func(c) { c.id == id })) {
      case (?c) ?toPublic(c);
      case null null;
    };
  };

  /// Filter and search characters
  public func filterCharacters(characters : List.List<CharacterInternal>, filter : CharacterFilter) : [Character] {
    characters
      .filter(func(c) {
        let passesPersonality = switch (filter.personalityType) {
          case (?pt) c.personalityType == pt;
          case null true;
        };
        let passesTrait = switch (filter.trait) {
          case (?t) c.traits.find(func(tr) { tr == t }) != null;
          case null true;
        };
        let passesSearch = switch (filter.searchQuery) {
          case (?q) {
            let lower = q.toLower();
            c.name.toLower().contains(#text lower) or
            c.personalityDescription.toLower().contains(#text lower) or
            c.backgroundSnippet.toLower().contains(#text lower);
          };
          case null true;
        };
        passesPersonality and passesTrait and passesSearch;
      })
      .map<CharacterInternal, Character>(toPublic)
      .toArray();
  };

  /// Create a new CharacterInternal from a request
  public func create(id : CharacterId, req : CreateCharacterRequest, createdAt : Int, isPreseeded : Bool) : CharacterInternal {
    {
      id;
      var name = req.name;
      var avatarStyle = req.avatarStyle;
      var personalityType = req.personalityType;
      var personalityDescription = req.personalityDescription;
      var traits = req.traits;
      var backgroundSnippet = req.backgroundSnippet;
      createdAt;
      isPreseeded;
    };
  };

  /// Return predefined trait library
  public func traitLibrary() : [Trait] {
    [
      "Witty",
      "Compassionate",
      "Curious",
      "Confident",
      "Adventurous",
      "Loyal",
      "Mysterious",
      "Playful",
      "Intellectual",
      "Nurturing",
      "Resilient",
      "Creative",
      "Empathetic",
      "Independent",
      "Charismatic",
    ];
  };

  /// Seed default characters if list is empty
  public func seedIfEmpty(characters : List.List<CharacterInternal>, nextId : Nat) : Nat {
    if (not characters.isEmpty()) {
      return nextId;
    };

    let now = Time.now();

    let seeds : [(Text, Types.AvatarStyle, Types.PersonalityType, Text, [Trait], Text)] = [
      (
        "Aria",
        #anime,
        #empathetic,
        "A warm-hearted listener who radiates calm and emotional depth. She sees the world through the lens of feeling and connection.",
        ["Compassionate", "Nurturing", "Loyal"],
        "Aria grew up surrounded by music and poetry. She has a gift for helping others find words for what they cannot express — a quiet anchor in every storm.",
      ),
      (
        "Nova",
        #realistic,
        #analytical,
        "Sharp-minded and precise, Nova thrives on logic and elegant solutions. She approaches every problem like a puzzle waiting to be solved.",
        ["Intellectual", "Curious", "Confident"],
        "Nova spent her childhood taking apart electronics just to rebuild them better. She once rewired an entire city block's smart-grid during a blackout — for fun.",
      ),
      (
        "Luna",
        #watercolor,
        #mysterious,
        "Ethereal and enigmatic, Luna speaks in riddles wrapped in metaphors. Her thoughts drift between worlds most people never notice.",
        ["Mysterious", "Creative", "Curious"],
        "Luna has always felt closer to moonlight than sunlight. She paints vivid dreamscapes and swears she can hear the color blue humming at night.",
      ),
      (
        "Zara",
        #illustrated,
        #adventurous,
        "Bold, fearless, and always chasing the next horizon. Zara brings relentless energy and infectious enthusiasm to everything she does.",
        ["Adventurous", "Charismatic", "Resilient"],
        "Zara crossed the Sahara on a motorbike at age nineteen. She collects passport stamps the way others collect memories — and has stories for every single one.",
      ),
      (
        "Elara",
        #pixelArt,
        #playful,
        "Bubbly and mischievous, Elara finds magic in small moments. She turns ordinary conversations into memorable adventures.",
        ["Playful", "Witty", "Empathetic"],
        "Elara once convinced an entire café to swap seats and form a flash-mob choir. Her laugh is contagious and her pockets are always full of origami cranes.",
      ),
      (
        "Sage",
        #realistic,
        #introverted,
        "Thoughtful and reserved, Sage chooses words like rare gems. She is a deep thinker who values silence as much as conversation.",
        ["Intellectual", "Independent", "Curious"],
        "Sage spent three years in a remote mountain cabin writing a philosophical treatise. She returned with calloused hands, a trove of hand-pressed botanical illustrations, and an unshakeable serenity.",
      ),
      (
        "Cleo",
        #anime,
        #creative,
        "Vivid imagination meets boundless expression — Cleo turns every blank canvas into a universe. She sees beauty in chaos and art in accident.",
        ["Creative", "Witty", "Charismatic"],
        "Cleo's studio is legendary: half art gallery, half controlled explosion. She once sculpted an entire city from discarded circuit boards and called it 'Tomorrow's Ruins.'",
      ),
      (
        "Vex",
        #illustrated,
        #extroverted,
        "Fiercely social and perpetually energized, Vex lights up every room she enters. She treats strangers like old friends and old friends like family.",
        ["Charismatic", "Playful", "Loyal"],
        "Vex has planned over two hundred pop-up community events across six countries. She believes the best thing any person can do is bring people together — and she proves it every day.",
      ),
    ];

    var id = nextId;
    for ((name, style, personality, desc, traits, bg) in seeds.values()) {
      characters.add(
        create(
          id,
          { name; avatarStyle = style; personalityType = personality; personalityDescription = desc; traits; backgroundSnippet = bg },
          now,
          true,
        )
      );
      id += 1;
    };

    id;
  };
};
