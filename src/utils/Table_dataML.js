export const Model_data = [
    {
        name:	"PM6-D3H4X",
        category: "SQM",
        description: "PM6 semiempirical QM method with corrections for non-covalent interactions",
        references: [
          <a href="https://doi.org/10.1007/s00894-007-0233-4" target="_blank"> (doi.org) </a>,
          <a href="https://doi.org/10.1021/ct200751e"target="_blank"> (doi.org) </a>,
          <a href="https://doi.org/10.1016/j.cplett.2011.03.009"target="_blank"> (doi.org) </a>
        ],
        code: [<a href="https://github.com/openmopac/mopac"target="_blank"> (github.com) </a>],
        accuracy: 90.261+"%",
      },
      {
        name:	"PM6-D3H4X'",
        category: "SQM",
        description: "Latest reparametrization of PM6-D3H4X",
        references: [
          <a href="https://doi.org/10.1021/acs.jctc.9b01265"target="_blank"> (doi.org) </a>,
          <a href="https://doi.org/10.1039/D2CP01600A"target="_blank"> (doi.org) </a>
        ],
        code: [<a href="https://github.com/openmopac/mopac"target="_blank"> (github.com) </a>],
        accuracy: 94.337+"%",
      },
      {
        name:	"PM7",
        category: "SQM",
        description: "NDDO-based semiempirical QM method with built-in corrections",
        references: [
          <a href="https://doi.org/10.1007/s00894-012-1667-x"target="_blank"> (doi.org) </a>
        ],
        code: [<a href ="https://github.com/openmopac/mopac"target="_blank"> (github.com) </a>],
        accuracy: 78.798+"%",
      },
      {
        name:	"PM6",
        category: "SQM",
        description: "NDDO-based semiempirical QM method",
        references: [<a href="https://doi.org/10.1007/s00894-007-0233-4"target="_blank"> (doi.org) </a>],
        code: [<a href="https://github.com/openmopac/mopac"target="_blank"> (github.com) </a>],
        accuracy: 75.048+"%",
      },
      {
        name:	"GFN2-xTB",
        category: "SQM",
        description: "Extended semiempirical tight-binding model",
        references: [<a href="https://doi.org/10.1021/acs.jctc.8b01176"target="_blank"> (doi.org) </a>],
        code: [<a href="https://github.com/grimme-lab/xtb"target="_blank"> (github.com) </a>],
        accuracy: 93.564+"%",
      },
      {
        name:	"PM6-ML",
        category: "SQM+ML",
        description: "PM6 with ML correction",
        references: [<a href="https://doi.org/10.1021/acs.jctc.4c01330"target="_blank"> (doi.org) </a>],
        code: [<a href="https://github.com/Honza-R/mopac-ml"target="_blank"> (github.com) </a>],
        accuracy: 97.670+"%",
      },
      {
        name:	"UMA-S-1",
        category: "ML",
        description: "Meta's universal ML potential",
        references: [
          <a href ="https://ai.meta.com/research/publications/uma-a-family-of-universal-models-for-atoms/"target="_blank"> (meta) </a>
        ],      
        code: [
          <a href="https://github.com/faceb.orgookresearch/fairchem"target="_blank"> (github.com) </a>,
           <a href="https://huggingface.co/facebook/UMA"target="_blank"> (huggingface.co) </a>
        ],
        accuracy: 90.840+"%",
      },
      {
        name:	"AIMNet2",
        category: "ML",
        description: "",
        references: [<a href="https://doi.org/10.1039/D4SC08572H"target="_blank"> (doi.org) </a>],
        code: [<a href="https://github.com/isayevlab/AIMNet2"target="_blank"> (github.com) </a>],
        accuracy: 75.796+"%",
      },
      {
        name:"ANI2x",
        category: "ML",
        description: "",
        references: [<a href="https://aiqm.github.io/torchani/" target="_blank"> (github.io) </a>],
        code: [<a href="https://github.com/aiqm/torchani" target="_blank"> (github.com) </a>]
      }
];