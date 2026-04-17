import Types "../types/characters";
import CharacterLib "../lib/characters";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  characters : List.List<CharacterLib.CharacterInternal>,
  idCounter : [var Nat],
) {
  /// List all characters, optionally filtered/searched
  public query func listCharacters(filter : Types.CharacterFilter) : async [Types.Character] {
    CharacterLib.filterCharacters(characters, filter);
  };

  /// Get a single character by ID
  public query func getCharacter(id : Types.CharacterId) : async ?Types.Character {
    CharacterLib.getById(characters, id);
  };

  /// Create and save a new character
  public func createCharacter(req : Types.CreateCharacterRequest) : async Types.Character {
    let id = idCounter[0];
    idCounter[0] += 1;
    let character = CharacterLib.create(id, req, Time.now(), false);
    characters.add(character);
    character.toPublic();
  };

  /// Get available personality types
  public query func listPersonalityTypes() : async [Types.PersonalityType] {
    [
      #introverted,
      #extroverted,
      #analytical,
      #creative,
      #empathetic,
      #adventurous,
      #mysterious,
      #playful,
    ];
  };

  /// Get the predefined trait library
  public query func listTraits() : async [Types.Trait] {
    CharacterLib.traitLibrary();
  };
};
