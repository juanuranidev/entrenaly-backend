// User
export const rolesSeed = [
  { name: "Administrator" },
  { name: "Client" },
  { name: "Trainer" },
];

export const subscriptionPlansSeed = [
  {
    name: "Inicial",
  },
  {
    name: "Profesional",
  },
  {
    name: "Experto",
  },
];

export const appReleasesSeed = [
  {
    date: new Date("2024-07-01 00:00:00"),
    version: "1.0.0",
    description:
      "Se agregó una nueva vista para poder agregar clientes, ver toda su información y editar su ficha médica. Se agregó una nueva vista para crear planes de tipo semanal, verlos, editarlos y asignarlos a clientes. Se agregó una nueva vista para ver ejericios, crear nuevos y agregar variantes a los existentes.",
  },
  {
    date: new Date("2024-07-02 00:00:00"),
    version: "1.1.0",
    description: "Se agregó un nuevo filtro de ejercicios por categoria.",
  },
  {
    date: new Date("2024-07-06 00:00:00"),
    version: "1.2.0",
    description:
      "Se agregaron más de 50 ejercicios nuevos. Se agregó la posibilidad de incluir varios ejercicios en una super serie.",
  },
  {
    date: new Date("2024-07-07 00:00:00"),
    version: "1.3.0",
    description:
      "Se actualizó la pantalla de actualizaciones. Se actualizó la arquitectura del código.",
  },
  {
    date: new Date("2024-07-14 00:00:00"),
    version: "1.4.0",
    description:
      "Ahora se puede descargar un plan en formato pdf. Se actualizó la pantalla de planes para los clientes. Ahora se pueden ver los ejercicios que se están seleccionado para agregarlos a un plan. Se arreglaron bugs y se hicieron varias mejoras visuales.",
  },
  {
    date: new Date("2024-07-28 00:00:00"),
    version: "1.5.0",
    description:
      "Nueva barra de navegación para dispositivos móviles. Ahora tus clientes pueden cargar su ficha médica cuando entran por primera vez en la aplicación.",
  },
];

// Exercise
export const exercisesCategoriesSeed = [
  { name: "Pecho" },
  { name: "Espalda" },
  { name: "Hombros" },
  { name: "Tríceps" },
  { name: "Bíceps" },
  { name: "Abdomen" },
  { name: "Piernas" },
];

export const exercisesSeed = [
  {
    name: "Remo en landmine con triángulo",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710988819/entrenaly/Remo%20en%20landmine%20con%20tri%C3%A1ngulo.webp",
    category: "Espalda",
  },
  {
    name: "Remo en máquina T agarre supino",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710989107/entrenaly/Remo_en_m%C3%A1quina_T_agarre_supino_xf9eiq.webp",
    category: "Espalda",
  },
  {
    name: "Deltoides posteriores en banco inclunado con barra",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710989185/entrenaly/Deltoides_posteriores_en_banco_inclunado_con_barra_wt7pgc.webp",
    category: "Espalda",
  },
  {
    name: "Pulldown con banda elástica",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710989264/entrenaly/Pulldown_con_banda_el%C3%A1stica_wliyqq.webp",
    category: "Espalda",
  },
  {
    name: "Pull up agarre neutro",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710989331/entrenaly/Pull_up_agarre_neutro_bufbmh.webp",
    category: "Espalda",
  },
  {
    name: "Tirón con banda elástica al pecho",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710989508/entrenaly/Tir%C3%B3n_con_banda_el%C3%A1stica_al_pecho_pgrgwv.webp",
    category: "Espalda",
  },
  {
    name: "Remo en polea alta a un brazo con giro parado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710989617/entrenaly/Remo_en_polea_alta_a_un_brazo_con_giro_parado_exlh2y.webp",
    category: "Espalda",
  },
  {
    name: "Remo con mancuernas en banco inclinado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710989629/entrenaly/Remo_con_mancuernas_en_banco_inclinado_wyyse8.webp",
    category: "Espalda",
  },
  {
    name: "Dominadas a un brazo",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710989813/entrenaly/Dominadas_a_un_brazo_fumfqo.webp",
    category: "Espalda",
  },
  {
    name: "Pollover con soga en polea",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710989825/entrenaly/Pollover_con_soga_en_polea_vxdebo.webp",
    category: "Espalda",
  },
  {
    name: "Dorsales en polea alta con triángulo",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710989926/entrenaly/Dorsales_en_polea_alta_con_tri%C3%A1ngulo_bilq5w.webp",
    category: "Espalda",
  },
  {
    name: "Chin up agarre cerrado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710989928/entrenaly/Chin_up_agarre_cerrado_eyllpv.webp",
    category: "Espalda",
  },
  {
    name: "Dominadas con peso",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710990041/entrenaly/Dominadas_con_peso_ryysf1.webp",
    category: "Espalda",
  },
  {
    name: "Pullover con barra espalda",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710990050/entrenaly/Pullover_con_barra_espalda_wzabhr.webp",
    category: "Espalda",
  },
  {
    name: "Dorsales en polea alta agarre cerrado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710990175/entrenaly/Dorsales_en_polea_alta_agarre_cerrado_ajn7ck.webp",
    category: "Espalda",
  },
  {
    name: "Remo en plancha con mancuerna a un brazo",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710990188/entrenaly/Remo_en_plancha_con_mancuerna_a_un_brazo_vynghb.webp",
    category: "Espalda",
  },
  {
    name: "Dorsales en polea alta a un brazo",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710990331/entrenaly/Dorsales_en_polea_alta_a_un_brazo_rqgx96.webp",
    category: "Espalda",
  },
  {
    name: "Dorsales en polea alta",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710990440/entrenaly/Dorsales_en_polea_alta_tcorgv.webp",
    category: "Espalda",
  },
  {
    name: "Remo en polea baja con soga agarre neutro",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710990528/entrenaly/Remo_en_polea_baja_con_soga_agarre_neutro_tzygw2.webp",
    category: "Espalda",
  },
  {
    name: "Dominadas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710990538/entrenaly/Dominadas_zgkgdd.webp",
    category: "Espalda",
  },
  {
    name: "Remo con barra parado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710990670/entrenaly/Remo_con_barra_parado_gjyvxe.webp",
    category: "Espalda",
  },
  {
    name: "Remo con mancuerna a un brazo",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710990674/entrenaly/Remo_con_mancuerna_a_un_brazo_mfwf0b.webp",
    category: "Espalda",
  },
  {
    name: "Remo invertido en barra",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710990767/entrenaly/Remo_invertido_en_barra_ii0e1m.webp",
    category: "Espalda",
  },
  {
    name: "Remo en máquina hammer",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710990801/entrenaly/Remo_en_m%C3%A1quina_hammer_qlgi2v.webp",
    category: "Espalda",
  },
  {
    name: "Remo con pesas rusas (KETTLEBELL)",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710990884/entrenaly/Remo_con_pesas_rusas_KETTLEBELL_cglzpi.webp",
    category: "Espalda",
  },
  {
    name: "Remo invertido con trx",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710990933/entrenaly/Remo_invertido_con_trx_fz72om.webp",
    category: "Espalda",
  },
  {
    name: "Remo en polea baja con triángulo",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710991036/entrenaly/Remo_en_polea_baja_con_tri%C3%A1ngulo_y5nujc.webp",
    category: "Espalda",
  },
  {
    name: "Remo en polea baja a un brazo sentado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710991044/entrenaly/Remo_en_polea_baja_a_un_brazo_sentado_oiqbv1.webp",
    category: "Espalda",
  },
  {
    name: "Deltoides posteriores en banco inclinado con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710991165/entrenaly/Deltoides_posteriores_en_banco_inclinado_con_mancuernas_x5repc.webp",
    category: "Espalda",
  },
  {
    name: "Remo inclinado agarre supino con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710991198/entrenaly/Remo_inclinado_agarre_supino_con_mancuernas_fhrxzi.webp",
    category: "Espalda",
  },
  {
    name: "Remo inclinado con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710991203/entrenaly/Remo_inclinado_con_mancuernas_uws4ch.webp",
    category: "Espalda",
  },
  {
    name: "Remo en polea baja con barra agarre abierto",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710991317/entrenaly/Remo_en_polea_baja_con_barra_agarre_abierto_fk9mrk.webp",
    category: "Espalda",
  },
  {
    name: "Dorsales en máquina",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710991363/entrenaly/Dorsales_en_m%C3%A1quina_fkm8tk.webp",
    category: "Espalda",
  },
  {
    name: "Remo en máquina T",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710991476/entrenaly/Remo_en_m%C3%A1quina_T_quwtvp.webp",
    category: "Espalda",
  },
  {
    name: "Ergómetro de remo",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710991482/entrenaly/Erg%C3%B3metro_de_remo_qutt4d.webp",
    category: "Espalda",
  },
  {
    name: "Remo en máquina sentado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710991533/entrenaly/Remo_en_m%C3%A1quina_sentado_zxjqpx.webp",
    category: "Espalda",
  },
  {
    name: "Remo a un brazo en polea baja parado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710991626/entrenaly/Remo_a_un_brazo_en_polea_baja_parado_hbxbkd.webp",
    category: "Espalda",
  },
  {
    name: "Remo con barra parado agarre supino",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710991633/entrenaly/Remo_con_barra_parado_agarre_supino_ef2xkl.webp",
    category: "Espalda",
  },
  {
    name: "Remo sentado con banda elástica",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710991768/entrenaly/Remo_sentado_con_banda_el%C3%A1stica_gg1qxq.webp",
    category: "Espalda",
  },
  {
    name: "Pullover con soga en polea alta",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710991910/entrenaly/Pullover_con_soga_en_polea_alta_yo8khl.webp",
    category: "Espalda",
  },
  {
    name: "Dead hang",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710991917/entrenaly/Dead_hang_bzytyg.webp",
    category: "Espalda",
  },
  {
    name: "Comando pull-ups",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710992061/entrenaly/Comando_pull-ups_ycvuyl.webp",
    category: "Espalda",
  },
  {
    name: "Tirón con banda elástica",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710992087/entrenaly/Tir%C3%B3n_con_banda_el%C3%A1stica_hkufwu.webp",
    category: "Espalda",
  },
  {
    name: "Remo bajo con banda elástica",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710992126/entrenaly/Remo_bajo_con_banda_el%C3%A1stica_mzq2ft.webp",
    category: "Espalda",
  },
  {
    name: "Dominada asistida con banda elástica",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710992240/entrenaly/Dominada_asistida_con_banda_el%C3%A1stica_ccjjpn.webp",
    category: "Espalda",
  },
  {
    name: "Pulldown a un brazo en polea alta",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710992306/entrenaly/Pulldown_a_un_brazo_en_polea_alta_qc9qmb.webp",
    category: "Espalda",
  },
  {
    name: "Dominada con agarre invertido",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710992458/entrenaly/Dominada_con_agarre_invertido_obhlb1.webp",
    category: "Espalda",
  },
  {
    name: "Dominada con agarre invertido",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1710992458/entrenaly/Dominada_con_agarre_invertido_obhlb1.webp",
    category: "Espalda",
  },
  {
    name: "Remo inclinado con barra",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720060820/entrenaly/remo_inclinado_con_barra_od6l14.gif",
    category: "Espalda",
  },
  {
    name: "Press de pecho en máquina",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718150501/entrenaly/press_de_pecho_en_maquina_rz6bru.gif",
    category: "Pecho",
  },
  {
    name: "Cruces en polea alta",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718150731/entrenaly/cruces_en_polea_alta_ersxeg.gif",
    category: "Pecho",
  },
  {
    name: "Press de banca",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718150846/entrenaly/press_de_banca_zogkxt.gif",
    category: "Pecho",
  },
  {
    name: "Fondos en paralelas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718150974/entrenaly/fondos_en_paralelas_aco6aq.gif",
    category: "Pecho",
  },
  {
    name: "Apertura con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718151060/entrenaly/apertura_con_mancuernas_gjy4l9.gif",
    category: "Pecho",
  },
  {
    name: "Fondos en paralelas con peso",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718151152/entrenaly/fondo_en_paralelas_con_peso_b7swlg.gif",
    category: "Pecho",
  },
  {
    name: "Press de banca declinado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718159486/entrenaly/press_de_banca_declinado_skvbau.gif",
    category: "Pecho",
  },
  {
    name: "Mariposa en máquina",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718159624/entrenaly/mariposa_en_maquina_cvqx5v.gif",
    category: "Pecho",
  },
  {
    name: "Press de banca con mancuernas declinado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718159714/entrenaly/press_de_banca_con_mancuernas_declinado_dqivu2.gif",
    category: "Pecho",
  },
  {
    name: "Press inclinado con agarre cerrado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718160206/entrenaly/press_inclinado_con_agarre_cerrado_diapfg.gif",
    category: "Pecho",
  },
  {
    name: "Press de banca con barra en banco inclinado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720060616/entrenaly/press_de_banca_inclinado_con_barra_orz7hw.gif",
    category: "Pecho",
  },
  {
    name: "Apertura con mancuernas en banco inclinado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720149826/entrenaly/apertura_con_mancuernas_en_banco_inclinado_yroomv.gif",
    category: "Pecho",
  },
  {
    name: "Press de banca con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720149900/entrenaly/press_de_banca_con_mancuernas_tuvi7t.gif",
    category: "Pecho",
  },
  {
    name: "Flexiones de brazos",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720149970/entrenaly/flexiones_de_brazos_aci4bg.gif",
    category: "Pecho",
  },
  {
    name: "Elevaciones frontales alternado sentado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718160427/entrenaly/vuelos_frontales_sentado_m8lmu9.gif",
    category: "Hombros",
  },
  {
    name: "Press tras nuca en máquina",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718160525/entrenaly/press_tras_nuca_con_maquina_zmpjs8.gif",
    category: "Hombros",
  },
  {
    name: "Elevaciones laterales de a un brazo",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718160578/entrenaly/vuelos_laterales_1_brazo_rjorhr.gif",
    category: "Hombros",
  },
  {
    name: "Elevaciones laterales de a un brazo en polea",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718160663/entrenaly/vuelos_laterales_1_brazo_polea_udrf9r.gif",
    category: "Hombros",
  },
  {
    name: "Elevaciones posteriores sentado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718160786/entrenaly/vuelos_posteriores_sentado_g7fyxk.gif",
    category: "Hombros",
  },
  {
    name: "Press tras nuca con barra sentado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718160847/entrenaly/press_tras_nuca_vqhgjv.gif",
    category: "Hombros",
  },
  {
    name: "Press militar con barra parado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720060501/entrenaly/press_militar_con_barra_a2lero.gif",
    category: "Hombros",
  },
  {
    name: "Press unilateral con mancuernas arrodillado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720150666/entrenaly/press_unilateral_con_mancuerna_arrodillado_mpcc5j.gif",
    category: "Hombros",
  },
  {
    name: "Elevaciones frontales en polea baja",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720150758/entrenaly/elevaciones_frontales_con_polea_baja_sr6zza.gif",
    category: "Hombros",
  },
  {
    name: "Press de hombros con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720150853/entrenaly/press_de_hombros_con_mancuernas_pweour.gif",
    category: "Hombros",
  },
  {
    name: "Press Arnold con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720150921/entrenaly/press_arnold_con_mancuernas_hklr0f.gif",
    category: "Hombros",
  },
  {
    name: "Elevaciones frontales con disco",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720151011/entrenaly/elevaciones_frontales_con_disco_ps689m.gif",
    category: "Hombros",
  },
  {
    name: "Elevaciones frontales con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720151112/entrenaly/elevaciones_frontales_con_mancuernas_cwxjhv.gif",
    category: "Hombros",
  },
  {
    name: "Press de hombros con mancuernas parado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720151240/entrenaly/press_de_hombros_con_mancuernas_parado_ahpymt.gif",
    category: "Hombros",
  },
  {
    name: "Elevaciones laterales con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720151325/entrenaly/elevaciones_laterales_con_mancuernas_ed79i1.gif",
    category: "Hombros",
  },
  {
    name: "Elevaciones frontales con barra",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720151587/entrenaly/elevaciones_frontales_con_barra_skgodd.gif",
    category: "Hombros",
  },
  {
    name: "Elevaciones frontales con mancuernas sentado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720151647/entrenaly/elevaciones_frontales_con_mancuernas_sentado_qvxlkp.gif",
    category: "Hombros",
  },
  {
    name: "Elevaciones frontales con barra en polea baja",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720151774/entrenaly/elevaciones_frontales_con_barra_en_polea_baja_stehhg.gif",
    category: "Hombros",
  },
  {
    name: "Press de hombros alternado con mancuernas parado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720151997/entrenaly/press_de_hombros_alternado_con_mancuernas_parado_ynypev.gif",
    category: "Hombros",
  },
  {
    name: "Elevación y rotación de hombros con mancuernas parado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720152107/entrenaly/elevacion_y_rotacion_de_hombros_con_mancuernas_parado_qiimca.gif",
    category: "Hombros",
  },
  {
    name: "Patada de tríceps en polea",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718161437/entrenaly/patada_de_triceps_eh3xm4.gif",
    category: "Tríceps",
  },
  {
    name: "Press francés en banco plano",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718161497/entrenaly/press_frances_en_banco_plano_pxzla1.gif",
    category: "Tríceps",
  },
  {
    name: "Fondos de tríceps en máquina",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718161602/entrenaly/fondos_de_triceps_en_maquina_idpbto.gif",
    category: "Tríceps",
  },
  {
    name: "Fondos en banco plano",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720061128/entrenaly/fondos_en_banco_plano_mtjqmt.gif",
    category: "Tríceps",
  },
  {
    name: "Extensión de tríceps con mancuerna tras nuca",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720061338/entrenaly/extension_de_triceps_con_mancuerna_tras_nuca_zurhlx.gif",
    category: "Tríceps",
  },
  {
    name: "Patada de tríceps con mancuerna",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720061424/entrenaly/patada_de_triceps_con_mancuerna_jvrvbj.gif",
    category: "Tríceps",
  },
  {
    name: "Flexiones diamante",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720061531/entrenaly/flexiones_diamante_lt7b81.gif",
    category: "Tríceps",
  },
  {
    name: "Extensión de tríceps en polea alta",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720061612/entrenaly/extension_de_triceps_con_polea_alta_shceb7.gif",
    category: "Tríceps",
  },
  {
    name: "Curl con barra",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718161679/entrenaly/curl_de_biceps_con_barra_kj5ndo.gif",
    category: "Bíceps",
  },
  {
    name: "Curl alternado con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718161803/entrenaly/curl_alternado_con_mancuernas_uyj315.gif",
    category: "Bíceps",
  },
  {
    name: "Curl en banco scott con mancuerna",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718161896/entrenaly/curl_de_biceps_en_banco_scott_jfeflm.gif",
    category: "Bíceps",
  },
  {
    name: "Curl concentrado con mancuerna",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720061797/entrenaly/curl_concentrado_con_mancuerna_mwigcw.gif",
    category: "Bíceps",
  },
  {
    name: "Curl martillo con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720061875/entrenaly/curl_martillo_con_mancuerna_iafl3a.gif",
    category: "Bíceps",
  },
  {
    name: "Curl inclinado con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720061941/entrenaly/curl_inclinado_con_mancuernas_rzkpw0.gif",
    category: "Bíceps",
  },
  {
    name: "Curl en polea baja",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720062007/entrenaly/curl_con_polea_baja_fntg02.gif",
    category: "Bíceps",
  },
  {
    name: "Curl en banco scott con barra z",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720062118/entrenaly/curl_en_banco_scott_con_barra_z_s2jl1t.gif",
    category: "Bíceps",
  },
  {
    name: "Prensa 45",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718245714/entrenaly/prensa_45_ikrzfw.gif",
    category: "Piernas",
  },
  {
    name: "Extensión de piernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718245803/entrenaly/extension_de_piernas_qyovs5.gif",
    category: "Piernas",
  },
  {
    name: "Sentadillas con barra abiertas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718245871/entrenaly/sentadillas_con_barra_abiertas_zkhzxh.gif",
    category: "Piernas",
  },
  {
    name: "Sentadillas con barra",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718246044/entrenaly/sentadillas_con_barra_jtwang.gif",
    category: "Piernas",
  },
  {
    name: "Sentadillas búlgaras con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718246101/entrenaly/sentadillas_bulgaras_my40yu.gif",
    category: "Piernas",
  },
  {
    name: "Sentadillas con mancuernas abiertas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1718246211/entrenaly/sentadillas_con_mancuernas_abiertas_igkyyo.gif",
    category: "Piernas",
  },
  {
    name: "Estocadas con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720060322/entrenaly/estocadas_con_mancuernas_xwxa6w.gif",
    category: "Piernas",
  },
  {
    name: "Sentadillas con peso corporal",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720120761/entrenaly/sentadilla_peso_corporal_wq7fs9.gif",
    category: "Piernas",
  },
  {
    name: "Peso muerto con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720120865/entrenaly/peso_muerto_con_mancuernas_mvarsm.gif",
    category: "Piernas",
  },
  {
    name: "Sentadillas búlgaras con barra",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720120955/entrenaly/sentadilla_bulgara_con_barra_w1g8nn.gif",
    category: "Piernas",
  },
  {
    name: "Elevaciones de cadera con barra",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720121043/entrenaly/elevaciones_de_cadera_con_barra_im3fca.gif",
    category: "Piernas",
  },
  {
    name: "Abductores en máquina",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720121173/entrenaly/abductores_en_maquina_sdkjav.gif",
    category: "Piernas",
  },
  {
    name: "Aductores en máquina",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720121242/entrenaly/aductores_en_maquina_lkcysh.gif",
    category: "Piernas",
  },
  {
    name: "Peso muerto con barra",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720121336/entrenaly/peso_muerto_con_barra_ggw0jt.gif",
    category: "Piernas",
  },
  {
    name: "Estocadas con barra",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720121400/entrenaly/estocadas_con_barra_yyk5tz.gif",
    category: "Piernas",
  },
  {
    name: "Etensión de cadera en polea baja",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720121634/entrenaly/extension_de_cadera_en_polea_baja_k2n2ct.gif",
    category: "Piernas",
  },
  {
    name: "Patada lateral en polea baja",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720121721/entrenaly/patada_lateral_en_polea_baja_psxrmv.gif",
    category: "Piernas",
  },
  {
    name: "Estocadas con peso corporal",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720121802/entrenaly/estocadas_con_peso_corporal_d5d6e1.gif",
    category: "Piernas",
  },
  {
    name: "Sentadillas en banco con mancuernas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720121881/entrenaly/sentadilla_en_banco_con_mancuernas_ykcro1.gif",
    category: "Piernas",
  },
  {
    name: "Peso muerto con barra hexagonal",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720121951/entrenaly/peso_muerto_con_barra_hexagonal_upfhi5.gif",
    category: "Piernas",
  },
  {
    name: "Bicho muerto",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720231979/entrenaly/bicho_muerto_uus9ab.gif",
    category: "Abdomen",
  },
  {
    name: "Elevación de rodillas colgado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720232062/entrenaly/elevacion_de_rodillas_colgado_g8mwtr.gif",
    category: "Abdomen",
  },
  {
    name: "Crunch",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720232867/entrenaly/crunch_my4ydy.gif",
    category: "Abdomen",
  },
  {
    name: "Crunch bicicleta",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720232486/entrenaly/crunsh_alternado_wartji.gif",
    category: "Abdomen",
  },
  {
    name: "Crunch invertido",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720232581/entrenaly/crunch_invertido_g0vsdu.gif",
    category: "Abdomen",
  },
  {
    name: "Crunch con piernas elevadas",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720232682/entrenaly/crunch_con_piernas_elevadas_ued49e.gif",
    category: "Abdomen",
  },
  {
    name: "Crunch con brazos extendidos",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720232979/entrenaly/crunch_con_brazos_extendidos_pmezlt.gif",
    category: "Abdomen",
  },
  {
    name: "Abdominales en v",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720233055/entrenaly/abdominales_en_v_lif4zn.gif",
    category: "Abdomen",
  },
  {
    name: "Puente lateral",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720233514/entrenaly/puente_lateral_wqyk1j.gif",
    category: "Abdomen",
  },
  {
    name: "Sit ups",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720233812/entrenaly/sit_ups_nmcysl.gif",
    category: "Abdomen",
  },
  {
    name: "Toque de talones",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720234038/entrenaly/toque_de_talones_cdqilz.gif",
    category: "Abdomen",
  },
  {
    name: "Elevación de piernas alternado",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720234120/entrenaly/elevacion_de_piernas_alternado_pvwsdo.gif",
    category: "Abdomen",
  },
  {
    name: "Mountain climber",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1720234272/entrenaly/mountain_climbers_qa3sbn.gif",
    category: "Abdomen",
  },
];

// Plan
export const plansCategoriesSeed = [
  {
    name: "Musculación",
  },
  {
    name: "Fuerza",
  },
  {
    name: "Flexibilidad",
  },
  {
    name: "Equilibrio y estabilidad",
  },
  {
    name: "Entrenamiento funcional",
  },
  {
    name: "Recuperación y estiramiento",
  },
];

export const plansTypesSeed = [
  {
    name: "Semanal",
  },
  {
    name: "Circuito",
  },
];

export const daysOfWeekSeed = [
  {
    name: "Lunes",
    order: 1,
  },
  {
    name: "Martes",
    order: 2,
  },
  {
    name: "Miércoles",
    order: 3,
  },
  {
    name: "Jueves",
    order: 4,
  },
  {
    name: "Viernes",
    order: 5,
  },
  {
    name: "Sábado",
    order: 6,
  },
  {
    name: "Domingo",
    order: 7,
  },
];
