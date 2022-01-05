import styled from "@emotion/styled";

// Text style   Weight  Size Line height  Emphasized weight
// Large Title     400    26          32                700
// Title 1         400    22          26                700
// Title 2         400    17          22                700
// Title 3         400    15          20                600
// Headline        700    13          16                900
// Subheadline     400    11          14                600
// Body            400    13          16                600
// Callout         400    12          15                600
// Footnote        400    10          13                600
// Caption 1       400    10          13                500
// Caption 2       500    10          13                600

/*
 * https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/typography/
 */

const DesignSystemText = {
  LargeTitle: styled.div`
    font: 400 26pt/32pt BlinkMacSystemFont, sans-serif;

    em {
      font-weight: 700;
    }
  `,
  Title1: styled.div`
    font: 400 22pt/26pt BlinkMacSystemFont, sans-serif;

    em {
      font-weight: 700;
    }
  `,
  Title2: styled.div`
    font: 400 17pt/22pt BlinkMacSystemFont, sans-serif;

    em {
      font-weight: 700;
    }
  `,
  Title3: styled.div`
    font: 400 15pt/20pt BlinkMacSystemFont, sans-serif;

    em {
      font-weight: 600;
    }
  `,
  Headline: styled.div`
    font: 700 13pt/16pt BlinkMacSystemFont, sans-serif;

    em {
      font-weight: 900;
    }
  `,
  Subheadline: styled.div`
    font: 400 11pt/14pt BlinkMacSystemFont, sans-serif;

    em {
      font-weight: 600;
    }
  `,
  Body: styled.div`
    font: 400 13pt/16pt BlinkMacSystemFont, sans-serif;

    em {
      font-weight: 600;
    }
  `,
  Callout: styled.div`
    font: 400 12pt/15pt BlinkMacSystemFont, sans-serif;

    em {
      font-weight: 600;
    }
  `,
  Footnote: styled.div`
    font: 400 10pt/13pt BlinkMacSystemFont, sans-serif;

    em {
      font-weight: 600;
    }
  `,
  Caption1: styled.div`
    font: 400 10pt/13pt BlinkMacSystemFont, sans-serif;

    em {
      font-weight: 500;
    }
  `,
  Caption2: styled.div`
    font: 500 10pt/13pt BlinkMacSystemFont, sans-serif;

    em {
      font-weight: 600;
    }
  `,
};

export default DesignSystemText;
