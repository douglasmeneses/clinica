import { prisma } from "../database/prisma";

const medicos = [
  {
    nome: "Dr. Carlos Eduardo Silva",
    email: "carlos.silva@clinica.com",
    crm: "CRM/SP 123456",
    especialidade: "Cardiologia",
  },
  {
    nome: "Dra. Ana Paula Santos",
    email: "ana.santos@clinica.com",
    crm: "CRM/SP 234567",
    especialidade: "Pediatria",
  },
  {
    nome: "Dr. Roberto Almeida",
    email: "roberto.almeida@clinica.com",
    crm: "CRM/SP 345678",
    especialidade: "Ortopedia",
  },
  {
    nome: "Dra. Juliana Ferreira",
    email: "juliana.ferreira@clinica.com",
    crm: "CRM/SP 456789",
    especialidade: "Dermatologia",
  },
  {
    nome: "Dr. Fernando Costa",
    email: "fernando.costa@clinica.com",
    crm: "CRM/SP 567890",
    especialidade: "Neurologia",
  },
  {
    nome: "Dra. Patrícia Oliveira",
    email: "patricia.oliveira@clinica.com",
    crm: "CRM/SP 678901",
    especialidade: "Ginecologia",
  },
  {
    nome: "Dr. Ricardo Mendes",
    email: "ricardo.mendes@clinica.com",
    crm: "CRM/SP 789012",
    especialidade: "Urologia",
  },
  {
    nome: "Dra. Mariana Rodrigues",
    email: "mariana.rodrigues@clinica.com",
    crm: "CRM/SP 890123",
    especialidade: "Endocrinologia",
  },
  {
    nome: "Dr. Paulo Henrique Lima",
    email: "paulo.lima@clinica.com",
    crm: "CRM/SP 901234",
    especialidade: "Gastroenterologia",
  },
  {
    nome: "Dra. Camila Souza",
    email: "camila.souza@clinica.com",
    crm: "CRM/SP 012345",
    especialidade: "Oftalmologia",
  },
  {
    nome: "Dr. Thiago Barbosa",
    email: "thiago.barbosa@clinica.com",
    crm: "CRM/RJ 123789",
    especialidade: "Psiquiatria",
  },
  {
    nome: "Dra. Letícia Martins",
    email: "leticia.martins@clinica.com",
    crm: "CRM/RJ 234890",
    especialidade: "Pneumologia",
  },
  {
    nome: "Dr. Gabriel Pereira",
    email: "gabriel.pereira@clinica.com",
    crm: "CRM/RJ 345901",
    especialidade: "Reumatologia",
  },
  {
    nome: "Dra. Beatriz Campos",
    email: "beatriz.campos@clinica.com",
    crm: "CRM/RJ 456012",
    especialidade: "Oncologia",
  },
  {
    nome: "Dr. André Santos",
    email: "andre.santos@clinica.com",
    crm: "CRM/RJ 567123",
    especialidade: "Cirurgia Geral",
  },
  {
    nome: "Dra. Larissa Alves",
    email: "larissa.alves@clinica.com",
    crm: "CRM/MG 678234",
    especialidade: "Hematologia",
  },
  {
    nome: "Dr. Rodrigo Dias",
    email: "rodrigo.dias@clinica.com",
    crm: "CRM/MG 789345",
    especialidade: "Nefrologia",
  },
  {
    nome: "Dra. Fernanda Melo",
    email: "fernanda.melo@clinica.com",
    crm: "CRM/MG 890456",
    especialidade: "Infectologia",
  },
  {
    nome: "Dr. Marcos Vinícius",
    email: "marcos.vinicius@clinica.com",
    crm: "CRM/MG 901567",
    especialidade: "Angiologia",
  },
  {
    nome: "Dra. Isabela Ribeiro",
    email: "isabela.ribeiro@clinica.com",
    crm: "CRM/MG 012678",
    especialidade: "Geriatria",
  },
];

const pacientes = [
  {
    nome: "João Silva",
    email: "joao.silva@email.com",
    cpf: "12345678901",
    telefone: "(11) 98765-4321",
    dataNascimento: new Date("1990-05-15"),
  },
  {
    nome: "Maria Santos",
    email: "maria.santos@email.com",
    cpf: "23456789012",
    telefone: "(11) 98765-4322",
    dataNascimento: new Date("1988-03-22"),
  },
  {
    nome: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    cpf: "34567890123",
    telefone: "(11) 98765-4323",
    dataNascimento: new Date("1995-07-30"),
  },
  {
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    cpf: "45678901234",
    telefone: "(11) 98765-4324",
    dataNascimento: new Date("1992-11-10"),
  },
  {
    nome: "Carlos Ferreira",
    email: "carlos.ferreira@email.com",
    cpf: "56789012345",
    telefone: "(11) 98765-4325",
    dataNascimento: new Date("1987-01-25"),
  },
  {
    nome: "Lucia Mendes",
    email: "lucia.mendes@email.com",
    cpf: "67890123456",
    telefone: "(11) 98765-4326",
    dataNascimento: new Date("1994-06-18"),
  },
  {
    nome: "Roberto Alves",
    email: "roberto.alves@email.com",
    cpf: "78901234567",
    telefone: "(11) 98765-4327",
    dataNascimento: new Date("1986-09-12"),
  },
  {
    nome: "Fernanda Rocha",
    email: "fernanda.rocha@email.com",
    cpf: "89012345678",
    telefone: "(11) 98765-4328",
    dataNascimento: new Date("1993-02-08"),
  },
  {
    nome: "Lucas Martins",
    email: "lucas.martins@email.com",
    cpf: "90123456789",
    telefone: "(11) 98765-4329",
    dataNascimento: new Date("1991-04-20"),
  },
  {
    nome: "Sofia Gomes",
    email: "sofia.gomes@email.com",
    cpf: "01234567890",
    telefone: "(11) 98765-4330",
    dataNascimento: new Date("1996-08-14"),
  },
];

const secretarios = [
  {
    nome: "Marcela Silva",
    email: "marcela.silva@clinica.com",
    senha: "senha123", // Em produção, isso será hashado
    telefone: "(11) 3333-1111",
  },
  {
    nome: "Juliana Costa",
    email: "juliana.costa@clinica.com",
    senha: "senha123",
    telefone: "(11) 3333-2222",
  },
  {
    nome: "Roberto Santos",
    email: "roberto.santos@clinica.com",
    senha: "senha123",
    telefone: "(11) 3333-3333",
  },
];

async function seed() {
  console.log("🌱 Iniciando seed de dados...\n");

  try {
    // =============================================
    // 1. MÉDICOS
    // =============================================
    console.log("👨‍⚕️  Criando médicos...");
    let medicosCount = 0;

    for (const medico of medicos) {
      try {
        await prisma.medico.create({
          data: medico,
        });
        medicosCount++;
        console.log(`  ✅ ${medico.nome} - ${medico.especialidade}`);
      } catch (error: any) {
        if (error.code === "P2002") {
          console.log(`  ⚠️  Médico já existe: ${medico.nome}`);
        } else {
          console.error(`  ❌ Erro ao criar ${medico.nome}:`, error.message);
        }
      }
    }
    console.log(`📊 Total de médicos criados: ${medicosCount}\n`);

    // =============================================
    // 2. PACIENTES
    // =============================================
    console.log("👥 Criando pacientes...");
    let pacientesCount = 0;

    for (const paciente of pacientes) {
      try {
        await prisma.paciente.create({
          data: paciente,
        });
        pacientesCount++;
        console.log(`  ✅ ${paciente.nome}`);
      } catch (error: any) {
        if (error.code === "P2002") {
          console.log(`  ⚠️  Paciente já existe: ${paciente.nome}`);
        } else {
          console.error(`  ❌ Erro ao criar ${paciente.nome}:`, error.message);
        }
      }
    }
    console.log(`📊 Total de pacientes criados: ${pacientesCount}\n`);

    // =============================================
    // 3. SECRETÁRIOS
    // =============================================
    console.log("🔑 Criando secretários...");
    let secretariosCount = 0;

    for (const secretario of secretarios) {
      try {
        await prisma.secretario.create({
          data: secretario,
        });
        secretariosCount++;
        console.log(`  ✅ ${secretario.nome}`);
      } catch (error: any) {
        if (error.code === "P2002") {
          console.log(`  ⚠️  Secretário já existe: ${secretario.nome}`);
        } else {
          console.error(`  ❌ Erro ao criar ${secretario.nome}:`, error.message);
        }
      }
    }
    console.log(`📊 Total de secretários criados: ${secretariosCount}\n`);

    // =============================================
    // 4. CONSULTAS
    // =============================================
    console.log("📅 Criando consultas...");

    // Obter médicos e pacientes do banco
    const medicosDb = await prisma.medico.findMany();
    const pacientesDb = await prisma.paciente.findMany();

    if (medicosDb.length === 0 || pacientesDb.length === 0) {
      console.log("⚠️  Sem médicos ou pacientes no banco. Pulando consultas.\n");
    } else {
      await seedConsultas(medicosDb, pacientesDb);
    }

    // =============================================
    // RESUMO FINAL
    // =============================================
    const totalMedicos = await prisma.medico.count();
    const totalPacientes = await prisma.paciente.count();
    const totalSecretarios = await prisma.secretario.count();
    const totalConsultas = await prisma.consulta.count();

    console.log("================================");
    console.log("📊 RESUMO DO BANCO DE DADOS");
    console.log("================================");
    console.log(`👨‍⚕️  Médicos: ${totalMedicos}`);
    console.log(`👥 Pacientes: ${totalPacientes}`);
    console.log(`🔑 Secretários: ${totalSecretarios}`);
    console.log(`📅 Consultas: ${totalConsultas}`);
    console.log("================================\n");

    console.log("🎉 Seed concluído com sucesso!");
  } catch (error) {
    console.error("❌ Erro no seed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Função auxiliar para criar consultas
 * Reduz a complexidade cognitiva da função principal
 */
async function seedConsultas(medicos: Array<any>, pacientes: Array<any>): Promise<void> {
  const motivos = [
    "Consulta de rotina",
    "Dor de cabeça",
    "Dor nas costas",
    "Acompanhamento",
    "Avaliação preventiva",
    "Exame de check-up",
    "Tratamento",
    "Primeira consulta",
  ];

  let consultasCount = 0;
  const dataInicio = new Date();

  for (let i = 0; i < 15; i++) {
    const medico = medicos[i % medicos.length];
    const paciente = pacientes[i % pacientes.length];
    const motivo = motivos[i % motivos.length];

    // Criar datas em dias diferentes
    const dataConsulta = new Date(dataInicio);
    dataConsulta.setDate(dataConsulta.getDate() + (i + 1));
    dataConsulta.setHours(9 + (i % 8), 0, 0, 0);

    try {
      await prisma.consulta.create({
        data: {
          dataHora: dataConsulta,
          motivo,
          pacienteId: paciente.id,
          medicoId: medico.id,
        },
      });
      consultasCount++;
      console.log(`  ✅ ${paciente.nome} → ${medico.nome} (${motivo})`);
    } catch (error: any) {
      if (error.code === "P2002") {
        console.log(`  ⚠️  Consulta já existe`);
      } else {
        console.error(`  ❌ Erro ao criar consulta: ${error.message}`);
      }
    }
  }
  console.log(`📊 Total de consultas criadas: ${consultasCount}\n`);
}

// Executa o seed
(async () => {
  await seed();
})().catch((error) => {
  console.error("❌ Falha no seed:", error);
  process.exit(1);
});
