export type Token = { name: string; value: string; usage?: string };
export type TokenFamily = { tokens: Token[] };

export type TextStyle = { name: string; fontSize: string; lineHeight: string; fontWeight: number };

export type DesignTokens = {
  name: string;
  color: TokenFamily & { themes: { id: string; name: string }[] };
  type: {
    families: Record<string, string>;
    groups: { name: string; family: string; styles: TextStyle[] }[];
  };
  spacing: TokenFamily;
  radius: TokenFamily;
  shadow: TokenFamily;
  layout: TokenFamily;
};
